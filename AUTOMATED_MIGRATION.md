# 🚀 Automated Content Migration

Yes! There **IS** an automated way to migrate your content to Sanity using the official Sanity CLI import tool.

## ⚡ Quick Start (2 minutes)

### Step 1: Create the Import File
```bash
node create-ndjson-import.mjs
```

### Step 2: Import Everything Automatically
```bash
sanity dataset import sanity-import.ndjson production --replace
```

**That's it!** All 18 team members, 5 research areas, and home page content will be imported automatically with their images.

## 📋 What Gets Imported

✅ **24 Documents Total:**
- 1 home page content
- 18 team members (with photos)
- 5 research areas (with images)

✅ **All Images:**
- Team member headshots
- Research area images
- Automatically uploaded and optimized

✅ **All Data:**
- Names, roles, bios, emails
- Research descriptions and highlights
- Proper grouping and ordering

## 🔧 Import Options

### Basic Import
```bash
sanity dataset import sanity-import.ndjson production
```

### Replace Existing (Recommended)
```bash
sanity dataset import sanity-import.ndjson production --replace
```

### Only Add Missing
```bash
sanity dataset import sanity-import.ndjson production --missing
```

### Continue on Image Errors
```bash
sanity dataset import sanity-import.ndjson production --replace --allow-failing-assets
```

## ⚠️ Prerequisites

1. **Sanity Studio Running**: `npm run sanity:dev`
2. **Images Exist**: All images must be in `public/images/` folders
3. **Project Configured**: Correct project ID (`fyi47z1v`)

## 🎯 Benefits of Automated Import

✅ **Fast**: Imports 24 documents in seconds  
✅ **Reliable**: Uses official Sanity tooling  
✅ **Complete**: Handles images, references, and all data  
✅ **Repeatable**: Can re-run anytime with `--replace`  
✅ **Error Handling**: Continues on individual failures  

## 🔄 Workflow

1. **Extract**: `node migrate-content.mjs` (already done)
2. **Prepare**: `node create-ndjson-import.mjs` (creates import file)
3. **Import**: `sanity dataset import sanity-import.ndjson production --replace`
4. **Verify**: Check `/team-cms`, `/research-cms`, `/index-cms`

## 🚨 Troubleshooting

### "File does not exist" Error
- Check that image files are in `public/images/headshots/` and `public/images/research/`
- Use `--allow-failing-assets` flag to skip missing images

### "Document already exists" Error
- Use `--replace` flag to overwrite existing documents

### Permission Error
- Make sure you have write access to the dataset
- Check your Sanity token permissions

## 💡 Pro Tips

1. **Test First**: Try on a development dataset first
2. **Backup**: Export your current dataset before importing
3. **Verify**: Check a few documents in Sanity Studio after import
4. **Re-import**: You can run the import multiple times safely with `--replace`

## 🎉 After Import

Once imported, your colleagues can immediately:
- Edit content through Sanity Studio
- Add new team members and research areas
- Upload and manage images visually
- Collaborate in real-time

**No manual data entry required!** 🎊 