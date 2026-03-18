import express from "express";
import { createServer as createViteServer } from "vite";
import session from "express-session";
import axios from "axios";
import dotenv from "dotenv";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";
import { tokenDb } from "./src/db/tokenDb";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Request Logger
app.use((req, res, next) => {
  console.log(`[Server] ${req.method} ${req.url}`);
  next();
});

// Check for required environment variables
const JOBBER_CLIENT_ID = process.env.JOBBER_CLIENT_ID;
const JOBBER_CLIENT_SECRET = process.env.JOBBER_CLIENT_SECRET;

const missingVars = [];
if (!JOBBER_CLIENT_ID) missingVars.push("JOBBER_CLIENT_ID");
if (!JOBBER_CLIENT_SECRET) missingVars.push("JOBBER_CLIENT_SECRET");

if (missingVars.length > 0) {
  console.warn(`⚠️  WARNING: Missing environment variables: ${missingVars.join(", ")}`);
  console.warn("Please set these in the platform's Secrets (lock icon 🔒) panel.");
  console.log("Available environment keys:", Object.keys(process.env).filter(k => !k.includes("SECRET") && !k.includes("KEY")));
}
const JOBBER_AUTH_URL = "https://api.getjobber.com/api/oauth/authorize";
const JOBBER_TOKEN_URL = "https://api.getjobber.com/api/oauth/token";

// Helper to refresh tokens
let refreshPromise: Promise<any> | null = null;

async function refreshJobberTokens() {
  // If a refresh is already in progress, return the existing promise
  if (refreshPromise) {
    console.log("[Jobber Auth] Refresh already in progress, waiting...");
    return refreshPromise;
  }

  const tokens = await tokenDb.getTokens();
  if (!tokens) {
    console.warn("[Jobber Auth] Cannot refresh: No tokens found in database.");
    return null;
  }

  if (!JOBBER_CLIENT_ID || !JOBBER_CLIENT_SECRET) {
    console.error("[Jobber Auth] Cannot refresh: JOBBER_CLIENT_ID or JOBBER_CLIENT_SECRET is missing from environment.");
    return null;
  }

  refreshPromise = (async () => {
    try {
      console.log("[Jobber Auth] Attempting to refresh Jobber tokens...");
      const response = await axios.post(JOBBER_TOKEN_URL, {
        client_id: JOBBER_CLIENT_ID,
        client_secret: JOBBER_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: tokens.refresh_token,
      });
      
      console.log("[Jobber Auth] Token refresh successful.");
      await tokenDb.saveTokens(response.data);
      return response.data;
    } catch (error: any) {
      console.error("Jobber Token Refresh Error:", error.response?.data || error.message);
      // If the refresh token is invalid, we must clear everything
      if (error.response?.status === 400 || error.response?.status === 401) {
        console.warn("[Jobber Auth] Refresh token is invalid or expired. Clearing tokens.");
        await tokenDb.clearTokens();
      }
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

// Helper to get valid access token
async function getValidAccessToken() {
  const tokens = await tokenDb.getTokens();
  if (!tokens) return null;

  // Check if expired (1 hour)
  // If created_at is missing, assume it's expired to be safe
  if (!tokens.created_at) {
    console.warn("[Jobber Auth] created_at missing from tokens. Refreshing...");
    const refreshed = await refreshJobberTokens();
    return refreshed?.access_token || null;
  }

  const createdAt = new Date(tokens.created_at).getTime();
  const now = new Date().getTime();
  const expiresInMs = (tokens.expires_in || 3600) * 1000;

  // If token is older than its expiry (minus 1 min buffer), refresh it
  if (now - createdAt > expiresInMs - 60000) { 
    console.log("[Jobber Auth] Token expired or near expiry. Refreshing...");
    const refreshed = await refreshJobberTokens();
    return refreshed?.access_token || null;
  }

  return tokens.access_token;
}

// Middleware
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || "buckley-mechanical-secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    sameSite: 'none',
    httpOnly: true,
  }
}));

// Helper to get redirect URI
const getRedirectUri = (req: express.Request) => {
  const host = req.headers['host'] || '';
  const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'https';
  
  // Prefer the current host if it's an AI Studio URL (dev or pre/shared)
  let baseUrl;
  if (host.includes('.run.app')) {
    baseUrl = `${protocol}://${host}`;
  } else if (process.env.APP_URL) {
    baseUrl = process.env.APP_URL.replace(/\/$/, '');
  } else {
    baseUrl = `${protocol}://${host}`;
  }
  
  const uri = `${baseUrl}/auth/jobber/callback`;
  console.log(`[Jobber Auth Debug] Generated Redirect URI: ${uri}`);
  return uri;
};

// --- API Routes ---

// OpenAI Chat Proxy
app.post("/api/ai/chat", async (req, res) => {
  const { messages, systemInstruction } = req.body;
  
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "OPENAI_API_KEY is not configured" });
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemInstruction },
        ...messages
      ],
      stream: true,
    });

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    for await (const chunk of response) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        res.write(`data: ${JSON.stringify({ text: content })}\n\n`);
      }
    }
    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error: any) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Ping for debugging
app.get("/api/ping", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString(), env: process.env.NODE_ENV });
});

// Get Jobber Auth URL
app.get("/api/auth/jobber/url", (req, res) => {
  if (!JOBBER_CLIENT_ID) {
    return res.status(500).json({ error: "JOBBER_CLIENT_ID is not configured" });
  }

  console.log(`[Jobber Auth Debug] Using Client ID: ${JOBBER_CLIENT_ID.substring(0, 8)}...`);
  const redirectUri = getRedirectUri(req);
  const state = Math.random().toString(36).substring(7);
  const params = new URLSearchParams({
    client_id: JOBBER_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "clients requests read:clients write:clients read:requests write:requests", // Expanded scopes
    state: state,
    prompt: "true", // Force the consent screen to show
    _t: Date.now().toString(),
  });

  const fullUrl = `${JOBBER_AUTH_URL}?${params}`;
  console.log(`[Jobber Auth Debug] Requesting Auth URL: ${fullUrl}`);
  res.json({ url: fullUrl });
});

// Jobber Callback
app.get("/auth/jobber/callback", async (req, res) => {
  const { code } = req.query;
  const redirectUri = getRedirectUri(req);

  if (!code) {
    return res.status(400).send("No code provided");
  }

  try {
    const response = await axios.post(JOBBER_TOKEN_URL, {
      client_id: JOBBER_CLIENT_ID,
      client_secret: JOBBER_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    });

    // Store tokens in DB
    const { scope } = response.data;
    console.log("[Jobber OAuth] Successfully connected. Granted scopes:", scope);
    await tokenDb.saveTokens(response.data);

    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'JOBBER_AUTH_SUCCESS' }, '*');
              window.close();
            } else {
              window.location.href = '/client-hub';
            }
          </script>
          <p>Authentication successful. This window should close automatically.</p>
        </body>
      </html>
    `);
  } catch (error: any) {
    console.error("Jobber Token Exchange Error:", error.response?.data || error.message);
    res.status(500).send("Failed to exchange code for tokens");
  }
});

// Check Connection Status
app.get("/api/auth/jobber/status", async (req, res) => {
  const tokens = await tokenDb.getTokens();
  res.json({ isConnected: !!tokens });
});

// Test Endpoint
app.get("/api/jobber/ping", (req, res) => {
  res.json({ status: "ok", message: "Jobber API proxy is reachable" });
});

// Logout from Jobber
app.post("/api/auth/jobber/logout", async (req, res) => {
  await tokenDb.clearTokens();
  res.json({ success: true });
});

// Proxy GraphQL Requests to Jobber
app.post("/api/jobber/graphql", async (req, res) => {
  console.log(`[Jobber Proxy] GraphQL request received: ${req.method} ${req.originalUrl}`);
  
  let accessToken = await getValidAccessToken();
  if (!accessToken) {
    console.warn("[Jobber Proxy] No access token found. User might not be connected.");
    return res.status(401).json({ error: "Not connected to Jobber. Please use the settings icon to connect your account." });
  }

  const makeRequest = async (token: string) => {
    return axios.post(
      "https://api.getjobber.com/api/graphql",
      req.body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-Jobber-Graphql-Version": "2025-04-16",
        },
      }
    );
  };

  try {
    console.log("[Jobber Proxy] Forwarding request to Jobber GraphQL API...");
    let response = await makeRequest(accessToken);
    console.log(`[Jobber Proxy] Jobber responded with status: ${response.status}`);
    res.json(response.data);
  } catch (error: any) {
    const status = error.response?.status || 500;
    
    // If we get a 401, the token might have been revoked or expired unexpectedly.
    // Try to refresh and retry once.
    if (status === 401) {
      console.warn("[Jobber Proxy] Received 401 from Jobber. Attempting to refresh token and retry...");
      const refreshedTokens = await refreshJobberTokens();
      if (refreshedTokens?.access_token) {
        try {
          console.log("[Jobber Proxy] Retry with refreshed token...");
          const retryResponse = await makeRequest(refreshedTokens.access_token);
          console.log(`[Jobber Proxy] Retry successful. Status: ${retryResponse.status}`);
          return res.json(retryResponse.data);
        } catch (retryError: any) {
          console.error("[Jobber Proxy] Retry failed after refresh.");
          return res.status(retryError.response?.status || 500).json(retryError.response?.data || { error: "Jobber API Error after retry" });
        }
      } else {
        console.error("[Jobber Proxy] Token refresh failed during 401 handling.");
        return res.status(401).json({ error: "Your Jobber session has expired. Please reconnect your account using the settings icon." });
      }
    }

    const data = error.response?.data || { error: "Jobber API Error" };
    console.error(`[Jobber Proxy] Error from Jobber API (Status ${status}):`, JSON.stringify(data));
    res.status(status).json(data);
  }
});

// Contact Form Submission to Jobber
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, address, service, message, smsConsent } = req.body;
  console.log(`[Contact API] New submission from ${name} (${email})`);

  let accessToken = await getValidAccessToken();
  if (!accessToken) {
    console.warn("[Contact API] Jobber not connected. Falling back to local logging.");
    // In a real production app, you might send an email here as a fallback
    return res.json({ 
      success: true, 
      message: "Message received! (Note: Jobber integration is currently pending configuration)",
      fallback: true
    });
  }

  try {
    // 1. Split name into first and last
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "Customer";

    // 2. Search for existing client or create new one
    // First, try to create/find client
    const clientMutation = `
      mutation CreateClient($firstName: String!, $lastName: String!, $email: String!, $phone: String!) {
        clientCreate(input: {
          firstName: $firstName,
          lastName: $lastName,
          emails: [{ address: $email, primary: true }],
          phones: [{ number: $phone, primary: true }]
        }) {
          client {
            id
          }
          userErrors {
            message
            path
          }
        }
      }
    `;

    const clientResponse = await axios.post(
      "https://api.getjobber.com/api/graphql",
      {
        query: clientMutation,
        variables: { firstName, lastName, email, phone }
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "X-Jobber-Graphql-Version": "2025-04-16",
        }
      }
    );

    // Check for GraphQL errors (like permission issues)
    if (clientResponse.data.errors) {
      const hasPermissionError = clientResponse.data.errors.some((e: any) => 
        e.message?.toLowerCase().includes("permission") || 
        e.message?.toLowerCase().includes("hidden")
      );
      
      if (hasPermissionError) {
        console.error("[Contact API] Jobber Permission Error:", clientResponse.data.errors);
        return res.status(403).json({ 
          success: false, 
          error: "Permission denied by Jobber. Please ensure you have granted 'clients' and 'requests' scopes and that your Jobber user has permission to create clients.",
          details: clientResponse.data.errors[0].message
        });
      }
    }

    let clientId: string;
    let propertyId: string | undefined;
    let existingClient: any = null;

    const clientData = clientResponse.data.data?.clientCreate;
    if (!clientData || (clientData.userErrors && clientData.userErrors.length > 0)) {
      // If client creation fails (e.g. duplicate email), we might need to search for them
      // But for now, let's log the error
      console.warn("[Contact API] Client creation issue:", clientData?.userErrors);
      
      // Fallback: search for client if creation failed due to uniqueness
      const searchResponse = await axios.post(
        "https://api.getjobber.com/api/graphql",
        {
          query: `
            query SearchClient($email: String!) {
              clients(first: 1, searchTerm: $email) {
                nodes {
                  id
                  properties(first: 1) {
                    nodes {
                      id
                    }
                  }
                }
              }
            }
          `,
          variables: { email }
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "X-Jobber-Graphql-Version": "2025-04-16",
          }
        }
      );
      
      existingClient = searchResponse.data.data?.clients?.nodes?.[0];
      if (!existingClient) {
        throw new Error("Failed to create or find client in Jobber");
      }
      clientId = existingClient.id;
      propertyId = existingClient.properties?.nodes?.[0]?.id;
    } else {
      clientId = clientData.client.id;
    }

    // 2.5 Ensure we have a property ID
    if (!propertyId) {
      const propertyMutation = `
        mutation CreateProperty($clientId: EncodedId!, $street: String!) {
          propertyCreate(clientId: $clientId, input: {
            properties: [
              {
                address: {
                  street1: $street
                }
              }
            ]
          }) {
            properties {
              id
            }
            userErrors {
              message
            }
          }
        }
      `;

      const propertyResponse = await axios.post(
        "https://api.getjobber.com/api/graphql",
        {
          query: propertyMutation,
          variables: {
            clientId,
            street: address || "Address not provided"
          }
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "X-Jobber-Graphql-Version": "2025-04-16",
          }
        }
      );

      propertyId = propertyResponse.data.data?.propertyCreate?.properties?.[0]?.id;
      
      if (!propertyId && !existingClient) {
        console.warn("[Contact API] Could not create property, but continuing...");
      }
    }

    // 3. Create Request in Jobber
    const requestMutation = `
      mutation CreateRequest($clientId: EncodedId!, $propertyId: EncodedId, $title: String!, $instructions: String!) {
        requestCreate(input: {
          clientId: $clientId,
          propertyId: $propertyId,
          title: $title,
          assessment: {
            instructions: $instructions
          }
        }) {
          request {
            id
          }
          userErrors {
            message
          }
        }
      }
    `;

    const requestResponse = await axios.post(
      "https://api.getjobber.com/api/graphql",
      {
        query: requestMutation,
        variables: {
          clientId,
          propertyId,
          title: `Website Lead: ${service}`,
          instructions: `Service Requested: ${service}\n\nMessage:\n${message}\n\nContact Details:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address || 'Not provided'}\n\nSMS Consent: ${smsConsent ? 'YES' : 'NO'}`
        }
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "X-Jobber-Graphql-Version": "2025-04-16",
        }
      }
    );

    const requestData = requestResponse.data.data?.requestCreate;
    const requestId = requestData?.request?.id;

    // Check for GraphQL errors - only treat as fatal if we didn't get a request ID
    if (requestResponse.data.errors && !requestId) {
      console.error("[Contact API] Jobber Request GraphQL Error:", requestResponse.data.errors);
      return res.status(403).json({ 
        success: false, 
        error: "Jobber API Error",
        details: requestResponse.data.errors[0].message
      });
    }

    if (requestData?.userErrors && requestData.userErrors.length > 0 && !requestId) {
      throw new Error(`Jobber Request Error: ${requestData.userErrors[0].message}`);
    }

    if (!requestId) {
      throw new Error("Failed to create request in Jobber (no ID returned)");
    }

    console.log(`[Contact API] Successfully created Jobber request: ${requestId}`);
    res.json({ success: true, message: "Service request created successfully in Jobber!" });

  } catch (error: any) {
    console.error("[Contact API] Error:", error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      error: "Failed to submit to Jobber",
      details: error.message 
    });
  }
});

// Add a separate route for trailing slash if needed
app.post("/api/jobber/graphql/", (req, res) => {
  res.redirect(307, "/api/jobber/graphql");
});

// Catch-all for unmatched API routes to help debugging
app.all("/api/*", (req, res) => {
  console.warn(`[Server] Unmatched API request: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ 
    error: "API route not found",
    method: req.method,
    path: req.originalUrl
  });
});

// --- Vite Middleware ---
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("[Server] Running in DEVELOPMENT mode with Vite middleware");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("[Server] Running in PRODUCTION mode");
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      if (req.url.startsWith('/api/')) {
        console.warn(`[Server] API request fell through to SPA fallback: ${req.url}`);
        return res.status(404).json({ error: "API route not found (fell through to SPA fallback)" });
      }
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    const url = process.env.APP_URL || `http://localhost:${PORT}`;
    console.log(`Server running at: ${url}`);
    if (!process.env.APP_URL) {
      console.log(`Note: In this environment, the app is accessible via the preview URL.`);
    }
  });
}

startServer();
