# GPTube Frontend

This is the [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) for the GPTube side project.

# Firebase Setup

Please check this [article](https://www.freecodecamp.org/news/create-full-stack-app-with-nextjs13-and-firebase/) to integrate the firebase app into the NextJS App.  
Basically you'll just need this [part](https://www.freecodecamp.org/news/create-full-stack-app-with-nextjs13-and-firebase/#how-to-set-up-firebase-in-next-js) to get access to your `config.json` file to set up your firebase configuration into the project.  
In the file `.env.example` file just paste the same values you have in your json:

```
# port for the backend
NEXT_PUBLIC_BACKEND_ENDPOINT="[https://api...]"

# Firebase configs
# your firebse api key
NEXT_PUBLIC_FIREBASE_API_KEY="..."
# your firebase auth domain
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="<app>.firebaseapp.com"
# your firebase project id
NEXT_PUBLIC_FIREBASE_PROJECT_ID="<app>"
# your firebase storage bucket
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="<app>.appspot.com"
# your firebase sender id
NEXT_PUBLIC_FIREBASE_SENDER_ID="..."
# Your firebase app id
NEXT_PUBLIC_FIREBASE_APP_ID="..."
# your firebase measurement id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="..."

# Usage Limit
USAGE_LIMIT_YOUTUBE=""

# Lemon Squeezy
LEMON_API_KEY=""
LEMON_STORE_ID=""
LEMON_WEBHOOK_PASS=""
```

**Note:** Set the **USAGE_LIMIT_YOUTUBE** to 20 and ignore the Lemon Squeezy configurations.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
