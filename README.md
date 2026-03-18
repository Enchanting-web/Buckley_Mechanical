# Buckley Mechanical

A React web application for Buckley Mechanical built with [Vite](https://vite.dev/) and [Appwrite](https://appwrite.io/).

## Features

- Responsive landing page with services overview and about section
- Contact / quote-request form
- Optional: store form submissions in an [Appwrite Database](https://appwrite.io/docs/products/databases)
- Ready to deploy on [Appwrite Sites](https://appwrite.io/docs/products/sites)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- An [Appwrite](https://cloud.appwrite.io/) project (free tier is fine)

### Local Development

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables
cp .env.example .env.local
# Edit .env.local and fill in your Appwrite Project ID

# 3. Start the dev server
npm run dev
```

Open <http://localhost:5173> in your browser.

### Build

```bash
npm run build
```

The production-ready static files are output to `./dist`.

## Deploying to Appwrite Sites

### Option A – Appwrite CLI (recommended)

1. Install the [Appwrite CLI](https://appwrite.io/docs/tooling/command-line/installation)
2. Log in: `appwrite login`
3. Update `appwrite.json` – set `"projectId"` to your Appwrite Project ID
4. Deploy:

```bash
appwrite deploy site
```

### Option B – Git integration

1. Go to your [Appwrite Console](https://cloud.appwrite.io/) → **Sites** → **Create site**
2. Connect your GitHub repository
3. Set the following build settings:
   - **Framework**: Vite
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
4. Add environment variables under **Settings → Environment Variables**:
   - `VITE_APPWRITE_ENDPOINT`
   - `VITE_APPWRITE_PROJECT_ID`
5. Click **Deploy**

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_APPWRITE_ENDPOINT` | No | Appwrite API endpoint (default: `https://cloud.appwrite.io/v1`) |
| `VITE_APPWRITE_PROJECT_ID` | Yes | Your Appwrite Project ID |
| `VITE_APPWRITE_DATABASE_ID` | No | Database ID for contact form submissions |
| `VITE_APPWRITE_COLLECTION_ID` | No | Collection ID for contact form submissions |

> **Note:** When `VITE_APPWRITE_DATABASE_ID` and `VITE_APPWRITE_COLLECTION_ID` are omitted, the contact form still works but submissions are not persisted.

## Tech Stack

- [React 19](https://react.dev/)
- [Vite 8](https://vite.dev/)
- [Appwrite Web SDK](https://appwrite.io/docs/sdks#web)
