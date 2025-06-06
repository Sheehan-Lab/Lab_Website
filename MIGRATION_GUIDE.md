# Content Migration Guide

## 🚀 Step-by-Step Content Migration

This guide will walk you through transferring your existing content from the static pages to Sanity CMS.

## Phase 1: Prepare Migration Data

### Step 1: Run the Migration Script
```bash
node migrate-content.js
```

This will create three JSON files with your existing content:
- `sanity-team-members.json` - All 18 team members
- `sanity-research-areas.json` - All 5 research areas  
- `sanity-home-content.json` - Home page content

### Step 2: Start Sanity Studio
```bash
npm run sanity:dev
```
Open `http://localhost:3333` in your browser.

## Phase 2: Migrate Team Members

### For Each Team Member:

1. **Click "Team Member" in Sanity Studio**
2. **Click "Create new Team Member"**
3. **Fill in the fields** using data from `sanity-team-members.json`:

#### Example - Dr. Vivien Sheehan:
```
Name: Dr. Vivien A. Sheehan
Role: Principal Investigator  
Group: pi
Bio: [Copy the full bio from JSON]
Email: vivien.sheehan@emory.edu
Display Order: 1
Active: ✅ (checked)
```

4. **Upload Image**:
   - Click the "Image" field
   - Upload the image from `public/images/headshots/vivien.png`
   - Add alt text: "Dr. Vivien A. Sheehan"

5. **Click "Publish"**

### ⚡ Speed Tips for Team Members:
- Keep the JSON file open in another tab for easy copying
- Images are in `public/images/headshots/`
- Groups are: `pi`, `lab_manager`, `faculty`, `research_staff`
- Set Display Order 1-18 to maintain current ordering

## Phase 3: Migrate Research Areas

### For Each Research Area:

1. **Click "Research Area" in Sanity Studio**
2. **Click "Create new Research Area"**
3. **Fill in the fields** using data from `sanity-research-areas.json`:

#### Example - IGFBP3 Research:
```
Title: IGFBP3 Research
Slug: igfbp3 (auto-generated)
Summary: [Copy from JSON]
Order: 1
Published: ✅ (checked)
```

4. **Description Field** (Rich Text):
   - Click in the description field
   - Paste the description text from JSON
   - Use the toolbar to add formatting if needed

5. **Highlights Array**:
   - Click "Add item" for each highlight
   - Copy each bullet point from the JSON

6. **Upload Images**:
   - Primary Image: Upload from `public/images/research/igfbp3.png`
   - Secondary Image: Upload from `public/images/research/igf2.png`

7. **Click "Publish"**

### Research Area Image Paths:
```
IGFBP3: /images/research/igfbp3.png + /images/research/igf2.png
Xenograft: /images/research/mobilization.png
CRISPR: /images/genomics-research-lab.jpg
Alloimmunization: /images/alloimmunization-research.jpg
Microfluidics: /images/research/microfluidics.png
```

## Phase 4: Migrate Home Page Content

1. **Click "Page Content" in Sanity Studio**
2. **Click "Create new Page Content"**
3. **Fill in the fields**:

```
Page ID: home
Title: Sheehan Lab
Subtitle: Advancing Sickle Cell Disease Research
Meta Description: [Copy from JSON]
```

4. **Content Field** (Rich Text):
   - Paste the content from `sanity-home-content.json`
   - Add formatting using the rich text toolbar

5. **Hero Image** (Optional):
   - Upload a hero image if you have one
   - Or leave blank to use the default pattern

6. **Click "Publish"**

## Phase 5: Test Your Migration

### Test Each Page:
1. **Team**: Visit `/team-cms` - Should show all team members
2. **Research**: Visit `/research-cms` - Should show all research areas  
3. **Home**: Visit `/index-cms` - Should show your custom content
4. **Publications**: Visit `/publications-cms` - Ready for publication data

### Verify Everything Works:
- All images display correctly
- Team members are grouped properly (PI → Lab Manager → Faculty → Research Staff)
- Research areas have navigation and rich text
- Links and email addresses work

## Phase 6: Add Publications (Optional)

Since your current publications come from PubMed, you can either:

### Option A: Keep PubMed Integration
Continue using `/publications` (automatic from PubMed)

### Option B: Migrate to CMS
Manually add key publications to have more control:

1. **Click "Publication" in Sanity Studio**
2. **For each important publication**:
```
Title: [Publication title]
Authors: [Array of author names]
Journal: [Journal name]
Year: [Publication year]
DOI: [DOI if available]
PMID: [PubMed ID if available]
Featured: ✅ (for homepage display)
```

## Phase 7: Update Navigation (Final Step)

Once all content is migrated and tested:

### Update Main Navigation:
Edit your navigation component to point to CMS pages:
- `/team` → `/team-cms`
- `/research` → `/research-cms` 
- `/publications` → `/publications-cms`
- `/` → `/index-cms`

### Or Set Up Redirects:
Add redirects in your hosting configuration:
```
/team → /team-cms
/research → /research-cms
/publications → /publications-cms
```

## 🎯 Migration Checklist

### Team Members (18 total):
- [ ] Dr. Vivien A. Sheehan (PI)
- [ ] Britney Hernandez (Lab Manager)
- [ ] Dr. Justin J. Yoo (Faculty)
- [ ] Dr. Ashwin P. Patel (Faculty)
- [ ] Dr. Ugochukwu Agbakwuru (Faculty)
- [ ] Dr. Kennedy N. Goldsborough (Faculty)
- [ ] Dr. Anupama Priyadarshini (Research Staff)
- [ ] Erica E. Evans (Research Staff)
- [ ] Michael 'Alex' Pendergast (Research Staff)
- [ ] Zak Kostamo (Research Staff)
- [ ] Jonathan Wade (Research Staff)
- [ ] Kathleen Romero (Research Staff)
- [ ] Mary C. Aliche (Research Staff)
- [ ] Jedidah G. Titus (Research Staff)
- [ ] Srija Ponna (Research Staff)
- [ ] Akshay Patwardhan (Research Staff)
- [ ] Nav Pasupuleti (Research Staff)
- [ ] Monica Rivera (Research Staff)

### Research Areas (5 total):
- [ ] IGFBP3 Research
- [ ] NBSGW Xenograft Model  
- [ ] CRISPR/Cas Gene Editing
- [ ] Alloimmunization & OMICs
- [ ] Microfluidics & Functional RBC Assays

### Page Content:
- [ ] Home page content
- [ ] Hero image (optional)

### Final Steps:
- [ ] Test all CMS pages
- [ ] Verify images display correctly
- [ ] Update navigation links
- [ ] Train colleagues on CMS usage

## 🚨 Troubleshooting

### Images Not Showing:
- Check that images exist in `public/images/` folders
- Verify image file names match exactly
- Try re-uploading through Sanity Studio

### Content Not Appearing:
- Ensure documents are published (not just saved as drafts)
- Check that the Sanity client is connected properly
- Verify the project ID is correct: `fyi47z1v`

### Studio Not Loading:
- Make sure you're running `npm run sanity:dev`
- Check `http://localhost:3333` 
- Clear browser cache if needed

## 💡 Pro Tips

1. **Batch Processing**: Do all team members first, then research areas
2. **Copy-Paste**: Keep JSON files open for easy copying
3. **Preview**: Use the preview pane in Sanity Studio to see formatted content
4. **Collaboration**: Multiple people can work in the studio simultaneously
5. **Backup**: Your original static pages remain unchanged as backup

## 🎉 You're Done!

Once migration is complete, your colleagues can manage all content through the beautiful Sanity Studio interface - no coding required! 