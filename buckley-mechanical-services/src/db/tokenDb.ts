import fs from "fs";
import path from "path";
import { appwriteServer } from "../services/appwriteServer";

const TOKENS_FILE = path.join(process.cwd(), "tokens.json");

export const tokenDb = {
  async getTokens() {
    // Try Appwrite first if configured
    const appwriteTokens = await appwriteServer.getTokens();
    if (appwriteTokens) return appwriteTokens;

    // Fallback to local file
    try {
      if (fs.existsSync(TOKENS_FILE)) {
        const data = fs.readFileSync(TOKENS_FILE, "utf-8");
        return JSON.parse(data);
      }
    } catch (error) {
      console.error("Error reading tokens file:", error);
    }
    return null;
  },

  async saveTokens(tokens: any) {
    // Save to Appwrite if configured
    await appwriteServer.saveTokens(tokens);

    // Also save to local file for now
    try {
      const data = {
        ...tokens,
        created_at: new Date().toISOString()
      };
      fs.writeFileSync(TOKENS_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error saving tokens file:", error);
    }
  },

  async clearTokens() {
    // Clear from Appwrite
    await appwriteServer.clearTokens();

    // Clear local file
    try {
      if (fs.existsSync(TOKENS_FILE)) {
        fs.unlinkSync(TOKENS_FILE);
      }
    } catch (error) {
      console.error("Error clearing tokens file:", error);
    }
  }
};
