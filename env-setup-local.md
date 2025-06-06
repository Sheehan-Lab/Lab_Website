# 🔧 Local Environment Setup

## Issue: New Content Not Appearing

If you add content in Sanity Studio but don't see it on your website, you need to set up environment variables locally.

## Solution: Create .env File

Create a `.env` file in your project root with:

```
SANITY_PROJECT_ID=fyi47z1v
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
```

## Quick Fix:

1. **Create the file:**
   ```bash
   echo "SANITY_PROJECT_ID=fyi47z1v" > .env
   echo "SANITY_DATASET=production" >> .env
   echo "SANITY_API_VERSION=2024-01-01" >> .env
   ```

2. **Restart your dev server:**
   ```bash
   npm run dev
   ```

3. **Test by:**
   - Adding a team member in Sanity Studio
   - Refreshing your local website
   - New content should appear!

## Alternative: Force Refresh

If you still don't see changes:

1. **Hard refresh** your browser (Cmd+Shift+R on Mac)
2. **Clear browser cache**
3. **Restart dev server**

## For Production (Vercel):

The environment variables go in your Vercel dashboard as described in `vercel-env-setup.md` 