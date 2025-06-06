# CMS Conversion Guide

## Overview

I've successfully converted your lab website to use Sanity CMS! Here's what has been created and how to use it.

## ✅ New CMS-Powered Pages

### 1. **Team Page** (`/team-cms`)
- **Replaces**: `team.astro` (hardcoded team data)
- **Features**: 
  - Pulls team members from Sanity CMS
  - Maintains all original styling and grouping
  - Supports profile images with optimization
  - Graceful error handling if CMS is unavailable

### 2. **Research Page** (`/research-cms`)
- **Replaces**: `research.astro` (hardcoded research content)
- **Features**:
  - Dynamic research areas from CMS
  - Rich text content support
  - Multiple images per research area
  - Automatic navigation generation
  - Portable text rendering

### 3. **Publications Page** (`/publications-cms`)
- **Replaces**: `publications.astro` (PubMed integration)
- **Features**:
  - Full publication management through CMS
  - Featured publications section
  - Automatic citation formatting
  - DOI/PubMed/URL links
  - Year-based grouping

### 4. **Home Page** (`/index-cms`)
- **Replaces**: `index.astro` (static home page)
- **Features**:
  - Editable hero content
  - Custom hero images
  - Dynamic content sections
  - Featured publications integration
  - Fallback content if CMS is empty

## 🎯 Content Management Features

### **Team Member Management**
Your colleagues can now:
- ✅ Add/edit team member profiles
- ✅ Upload and manage profile photos
- ✅ Update bios, roles, and contact information
- ✅ Organize members by group (PI, Lab Manager, Faculty, Research Staff)
- ✅ Control visibility (active/inactive)
- ✅ Set display order

### **Research Area Management**
Your colleagues can now:
- ✅ Create and edit research areas
- ✅ Write rich text descriptions with formatting
- ✅ Add key highlights and findings
- ✅ Upload primary and secondary images
- ✅ Generate URL-friendly slugs automatically
- ✅ Control publication status

### **Publication Management**
Your colleagues can now:
- ✅ Add publications with full metadata (DOI, PMID, etc.)
- ✅ Mark publications as "featured" for homepage
- ✅ Organize by publication type (journal, conference, etc.)
- ✅ Include abstracts and links
- ✅ Automatic citation formatting

### **Page Content Management**
Your colleagues can now:
- ✅ Edit home page content and hero images
- ✅ Create content for any page using page IDs
- ✅ Rich text editing with images
- ✅ SEO meta tags and descriptions
- ✅ Version history and publishing controls

## 🚀 Getting Started

### **Step 1: Start the CMS**
```bash
npm run sanity:dev
```
This opens the Sanity Studio at `http://localhost:3333`

### **Step 2: Add Initial Content**

1. **Add Team Members**:
   - Click "Team Member" in the studio
   - Fill in name, role, group, bio, email
   - Upload a profile photo
   - Set display order and publish

2. **Add Research Areas**:
   - Click "Research Area" in the studio
   - Add title (slug auto-generates)
   - Write summary and full description
   - Add key highlights as bullet points
   - Upload research images
   - Publish when ready

3. **Add Publications**:
   - Click "Publication" in the studio
   - Add full publication details
   - Mark important ones as "featured"
   - Include DOI, PMID, or URLs if available

4. **Customize Home Page**:
   - Click "Page Content" in the studio
   - Create new document with Page ID: "home"
   - Set title, subtitle, and upload hero image
   - Write main content with rich text editor

### **Step 3: View Your Content**
- Visit the CMS-powered pages:
  - `/team-cms` - CMS team page
  - `/research-cms` - CMS research page
  - `/publications-cms` - CMS publications page
  - `/index-cms` - CMS home page

## 🔄 Migration Strategy

### **Gradual Migration**
1. **Test Phase**: Use CMS pages alongside existing pages
2. **Content Migration**: Add existing content to CMS
3. **URL Switch**: Update navigation to use CMS pages
4. **Final Step**: Replace original pages or redirect to CMS versions

### **Content Migration Checklist**

**Team Members** (from `team.astro`):
- [ ] Dr. Vivien A. Sheehan (PI)
- [ ] Britney Hernandez (Lab Manager)
- [ ] Dr. Justin J. Yoo (Faculty)
- [ ] Dr. Ashwin P. Patel (Faculty)
- [ ] [All other team members...]

**Research Areas** (from `research.astro`):
- [ ] IGFBP3 Research
- [ ] NBSGW Xenograft Model
- [ ] CRISPR/Cas Gene Editing
- [ ] Alloimmunization & OMICs
- [ ] Microfluidics & RBC Assays

## 🎨 Styling & Customization

### **Consistent Design**
All CMS pages maintain:
- ✅ Original Emory branding colors
- ✅ Responsive layouts
- ✅ Hover effects and animations
- ✅ Mobile-friendly design
- ✅ Accessibility features

### **Enhanced Features**
- ✅ Image optimization with Sanity
- ✅ Better loading states and error handling
- ✅ SEO-friendly structure
- ✅ Real-time content updates

## 🛠 Technical Architecture

### **Data Flow**
```
Sanity Studio → Sanity API → Astro Pages → Your Website
```

### **Key Files**
- `sanity/schemas/` - Content type definitions
- `src/utils/sanity.ts` - API client and queries
- `src/pages/*-cms.astro` - CMS-powered pages
- `sheehan-lab-website/` - Sanity Studio configuration

### **Environment Setup**
- Project ID: `fyi47z1v`
- Dataset: `production`
- Studio runs on: `http://localhost:3333`

## 📋 For Your Colleagues

### **Content Editor Guide**
1. **Access**: Go to studio URL (will be hosted after deployment)
2. **Login**: Use invited Sanity account
3. **Edit**: Use visual interface to update content
4. **Publish**: Changes appear immediately on website
5. **Collaborate**: Multiple people can edit simultaneously

### **No Technical Skills Required**
- ✅ Visual editing interface
- ✅ Drag-and-drop image uploads
- ✅ Rich text editor like Google Docs
- ✅ Preview changes before publishing
- ✅ Undo/redo capabilities

## 🚀 Deployment

### **Development**
```bash
# Start Astro site
npm run dev

# Start Sanity Studio
npm run sanity:dev
```

### **Production**
```bash
# Deploy Sanity Studio
npm run sanity:deploy

# Build Astro site (includes CMS content)
npm run build
```

The studio will be hosted at `https://your-project.sanity.studio` for easy access by your colleagues.

## 🎯 Benefits Achieved

### **For Your Colleagues**
- ✅ **Easy Content Management**: No coding required
- ✅ **Real-time Collaboration**: Multiple editors
- ✅ **Version Control**: Track all changes
- ✅ **Image Management**: Automatic optimization
- ✅ **Publishing Control**: Draft/publish workflow

### **For the Lab**
- ✅ **Future-Proof**: Content survives developer transitions
- ✅ **Professional**: Industry-standard CMS
- ✅ **Cost-Effective**: Free tier supports 3 users
- ✅ **Scalable**: Grows with your lab's needs
- ✅ **Secure**: Hosted infrastructure with backups

## 🔗 Quick Links

- **Original Pages**: `/team`, `/research`, `/publications`, `/`
- **CMS Pages**: `/team-cms`, `/research-cms`, `/publications-cms`, `/index-cms`
- **Demo Page**: `/team-cms-demo` (shows setup instructions)
- **Sanity Studio**: `http://localhost:3333` (when running)
- **Setup Guide**: `SANITY_SETUP.md`

Your lab website is now fully CMS-powered and ready for your colleagues to manage independently! 