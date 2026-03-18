import { Client, Databases, ID, Query } from 'node-appwrite';
import dotenv from 'dotenv';

dotenv.config();

const endpoint = process.env.VITE_APPWRITE_ENDPOINT || 'https://nyc.cloud.appwrite.io/v1';
const projectId = process.env.VITE_APPWRITE_PROJECT_ID || '69a7863a00101c20b93f';
const apiKey = process.env.APPWRITE_API_KEY;
const databaseId = process.env.APPWRITE_DATABASE_ID;
const collectionId = process.env.APPWRITE_COLLECTION_ID;

const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId);

if (apiKey) {
    client.setKey(apiKey);
}

const databases = new Databases(client);

export const appwriteServer = {
    async getTokens() {
        if (!databaseId || !collectionId || !apiKey) {
            console.warn("[Appwrite Server] Missing configuration for token storage. Falling back to null.");
            return null;
        }

        try {
            const response = await databases.listDocuments(
                databaseId,
                collectionId,
                [Query.limit(1)]
            );

            if (response.documents.length > 0) {
                const doc = response.documents[0];
                // Appwrite returns metadata fields like $id, we just want the data
                const { $id, $collectionId, $databaseId, $createdAt, $updatedAt, $permissions, ...tokens } = doc;
                return tokens;
            }
        } catch (error) {
            console.error("[Appwrite Server] Error fetching tokens:", error);
        }
        return null;
    },

    async saveTokens(tokens: any) {
        if (!databaseId || !collectionId || !apiKey) {
            console.warn("[Appwrite Server] Missing configuration for token storage. Cannot save.");
            return;
        }

        try {
            const existing = await databases.listDocuments(
                databaseId,
                collectionId,
                [Query.limit(1)]
            );

            const data = {
                ...tokens,
                created_at: new Date().toISOString()
            };

            if (existing.documents.length > 0) {
                await databases.updateDocument(
                    databaseId,
                    collectionId,
                    existing.documents[0].$id,
                    data
                );
            } else {
                await databases.createDocument(
                    databaseId,
                    collectionId,
                    ID.unique(),
                    data
                );
            }
        } catch (error) {
            console.error("[Appwrite Server] Error saving tokens:", error);
        }
    },

    async clearTokens() {
        if (!databaseId || !collectionId || !apiKey) return;

        try {
            const existing = await databases.listDocuments(
                databaseId,
                collectionId,
                [Query.limit(1)]
            );

            if (existing.documents.length > 0) {
                await databases.deleteDocument(
                    databaseId,
                    collectionId,
                    existing.documents[0].$id
                );
            }
        } catch (error) {
            console.error("[Appwrite Server] Error clearing tokens:", error);
        }
    }
};
