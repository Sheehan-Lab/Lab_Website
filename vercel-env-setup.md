# 🚀 Vercel Deployment Setup

## Environment Variables for Vercel

Add these environment variables in your Vercel dashboard:

### Required Variables:
```
SANITY_PROJECT_ID=fyi47z1v
SANITY_DATASET=production
```

### Optional (for better performance):
```
SANITY_API_VERSION=2024-01-01
```

## How to Add in Vercel:

1. Go to your project in Vercel dashboard
2. Click **Settings** tab
3. Click **Environment Variables** 
4. Add each variable:
   - **Name**: `SANITY_PROJECT_ID`
   - **Value**: `fyi47z1v`
   - **Environments**: Production, Preview, Development (check all)

5. Repeat for `SANITY_DATASET` with value `production`

## Deploy Steps:

1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Add Sanity CMS integration - automated migration complete"
   git push origin main
   ```

2. **Vercel will auto-deploy** with the new CMS-powered pages!

## What Changed:

✅ **All main pages now use Sanity CMS:**
- `/` (home) - CMS powered
- `/team` - CMS powered  
- `/research` - CMS powered
- `/publications` - CMS powered

✅ **Static backups preserved:**
- `/team-static-backup.astro`
- `/research-static-backup.astro` 
- `/publications-static-backup.astro`
- `/index-static-backup.astro`

## After Deploy:

Your colleagues can immediately start editing content through:
**https://fyi47z1v.sanity.studio**

Changes will appear on your live site instantly! 🎉 