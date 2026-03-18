import axios from 'axios';

export interface JobberRequestInput {
  title: string;
  description: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  address: string;
  smsConsent: boolean;
}

export const jobberService = {
  async getStatus() {
    const response = await axios.get('/api/auth/jobber/status');
    return response.data.isConnected;
  },

  async getAuthUrl() {
    const response = await axios.get('/api/auth/jobber/url');
    return response.data.url;
  },

  async logout() {
    await axios.post('/api/auth/jobber/logout');
  },

  async createRequest(input: JobberRequestInput) {
    const nameParts = input.clientName.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "Client";

    try {
      // Step 1: Create the Client
      const clientMutation = `
        mutation CreateClient($firstName: String!, $lastName: String!, $email: String!, $phone: String!) {
          clientCreate(input: {
            firstName: $firstName,
            lastName: $lastName,
            emails: [{address: $email, primary: true}],
            phones: [{number: $phone, primary: true}]
          }) {
            client {
              id
            }
            userErrors {
              message
            }
          }
        }
      `;

      const clientResponse = await axios.post('/api/jobber/graphql', {
        query: clientMutation,
        variables: {
          firstName,
          lastName,
          email: input.clientEmail,
          phone: input.clientPhone
        }
      });

      console.log("Jobber Client Create Response:", clientResponse.data);

      if (clientResponse.data.errors) {
        return { errors: clientResponse.data.errors };
      }

      const clientId = clientResponse.data?.data?.clientCreate?.client?.id;
      const clientErrors = clientResponse.data?.data?.clientCreate?.userErrors;

      if (!clientId) {
        return {
          errors: clientErrors?.length ? clientErrors : [{ message: "Failed to create client in Jobber." }]
        };
      }

      // Step 2: Create the Property for the Client
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

      const propertyResponse = await axios.post('/api/jobber/graphql', {
        query: propertyMutation,
        variables: {
          clientId,
          street: input.address
        }
      });

      console.log("Jobber Property Create Response:", propertyResponse.data);

      if (propertyResponse.data.errors) {
        return { errors: propertyResponse.data.errors };
      }

      const propertyId = propertyResponse.data?.data?.propertyCreate?.properties?.[0]?.id;
      const propertyErrors = propertyResponse.data?.data?.propertyCreate?.userErrors;

      if (!propertyId) {
        return {
          errors: propertyErrors?.length ? propertyErrors : [{ message: "Failed to create property in Jobber." }]
        };
      }

      // Step 3: Create the Request
      const requestMutation = `
        mutation CreateRequest($clientId: EncodedId!, $propertyId: EncodedId!, $title: String!, $instructions: String!) {
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
              title
            }
            userErrors {
              message
            }
          }
        }
      `;

      const requestResponse = await axios.post('/api/jobber/graphql', {
        query: requestMutation,
        variables: {
          clientId,
          propertyId,
          title: input.title,
          instructions: `${input.description}\n\nSMS Consent: ${input.smsConsent ? 'YES' : 'NO'}`
        }
      });

      console.log("Jobber Request Create Response:", requestResponse.data);

      const requestData = requestResponse.data?.data?.requestCreate;
      const requestId = requestData?.request?.id;

      // If we got a request ID, it's a success even if there are warnings/errors
      if (requestId) {
        return requestResponse.data;
      }

      if (requestResponse.data.errors) {
        return { errors: requestResponse.data.errors };
      }

      return requestResponse.data;
    } catch (error: any) {
      console.error("Jobber Multi-step Request Error:", error);
      throw error;
    }
  }
};
