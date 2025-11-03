# Vercel Environment Variables

To deploy this application to Vercel, you need to set the following environment variables in your Vercel project settings:

## Required Environment Variables

1. **OPENAI_API_KEY**
   - Description: Your OpenAI API key for AI features
   - Where it's used: `/api/chat`, `/api/upload`, `/lib/extractFields.ts`, `/lib/qdrant.ts`
   - How to get it: https://platform.openai.com/api-keys

2. **RUNPOD_API_KEY**
   - Description: Your RunPod API key for OCR processing
   - Where it's used: `/api/upload/route.ts`
   - How to get it: https://www.runpod.io/console/user/settings

3. **NEXT_PUBLIC_SUPABASE_URL**
   - Description: Your Supabase project URL
   - Where it's used: `/lib/supabase.ts`
   - How to get it: Your Supabase project dashboard

4. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Description: Your Supabase anon/public key
   - Where it's used: `/lib/supabase.ts`
   - How to get it: Your Supabase project dashboard

5. **QDRANT_URL** (or **NEXT_PUBLIC_QDRANT_URL**)
   - Description: Your Qdrant vector database URL
   - Where it's used: `/lib/qdrant.ts`, `/api/debug-qdrant/route.ts`
   - How to get it: Your Qdrant instance configuration

6. **QDRANT_API_KEY** (or **NEXT_PUBLIC_QDRANT_API_KEY**)
   - Description: Your Qdrant API key
   - Where it's used: `/lib/qdrant.ts`, `/api/debug-qdrant/route.ts`
   - How to get it: Your Qdrant instance configuration

## How to Set Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable with its value
4. Select the environments (Production, Preview, Development)
5. Click **Save**
6. Redeploy your application

## Notes

- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- Variables without the prefix are server-side only
- For sensitive keys (like API keys), do NOT use `NEXT_PUBLIC_` prefix
- After adding environment variables, you need to redeploy for changes to take effect

