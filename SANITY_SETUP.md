# Sanity CMS Setup Guide

This guide will help you set up and manage the headless CMS for your lab website using Sanity.

## Quick Start

### 1. Create a Sanity Project

1. Go to [https://sanity.io/manage](https://sanity.io/manage)
2. Sign up or log in
3. Click "Create new project"
4. Choose a project name (e.g., "Lab Website CMS")
5. Select "Company" or "Personal" as needed
6. Copy your **Project ID** (you'll need this)

### 2. Configure Environment Variables

1. Open the `.env` file in your project root
2. Replace `your-project-id-here` with your actual Sanity Project ID:
   ```
   PUBLIC_SANITY_PROJECT_ID=abc123def  # Your actual project ID
   PUBLIC_SANITY_DATASET=production
   ```

### 3. Start the Sanity Studio

```bash
npm run sanity:dev
```

This will open the Sanity Studio in your browser at `http://localhost:3333`

## Content Management

### Team Members

- **Name**: Full name of the team member
- **Role**: Their position/title
- **Group**: Select from PI, Lab Manager, Faculty & Fellows, or Research Staff
- **Biography**: Detailed bio information
- **Email**: Contact email
- **Profile Image**: Upload headshot photo
- **Display Order**: Numbers for ordering (lower = appears first)
- **Active**: Toggle to show/hide from website

### Research Areas

- **Title**: Name of the research area
- **Slug**: URL-friendly identifier (auto-generated)
- **Summary**: Brief overview
- **Description**: Full rich-text description
- **Key Highlights**: Bullet points of key findings
- **Primary/Secondary Images**: Research images
- **Display Order**: Order on research page
- **Published**: Toggle to show/hide

### Publications

- **Title**: Publication title
- **Authors**: List of authors
- **Journal**: Journal name
- **Year**: Publication year
- **Volume/Issue/Pages**: Journal details
- **DOI/PMID**: Identifiers
- **URL**: Link to publication
- **Abstract**: Full abstract
- **Type**: Journal, Conference, etc.
- **Featured**: Mark for highlighting
- **Published**: Toggle visibility

### Page Content

- **Page ID**: Unique identifier (home, about, contact, etc.)
- **Title/Subtitle**: Page headers
- **Hero Image**: Main page image
- **Content**: Rich text content with images
- **SEO**: Meta tags and keywords
- **Published**: Toggle visibility

## Integration with Astro

### Example: Using Team Members in Astro

```astro
---
// src/pages/team-cms.astro
import Layout from '../layouts/Layout.astro';
import { getTeamMembers, urlFor } from '../utils/sanity';

const teamMembers = await getTeamMembers();

// Group by category
const groupedMembers = {
  pi: teamMembers.filter(m => m.group === 'pi'),
  lab_manager: teamMembers.filter(m => m.group === 'lab_manager'),
  faculty: teamMembers.filter(m => m.group === 'faculty'),
  research_staff: teamMembers.filter(m => m.group === 'research_staff'),
};
---

<Layout title="Our Team">
  <main>
    <h1>Our Team</h1>
    
    {Object.entries(groupedMembers).map(([group, members]) => (
      <section>
        <h2>{group.replace('_', ' ').toUpperCase()}</h2>
        <div class="team-grid">
          {members.map((member) => (
            <div class="team-member">
              {member.image && (
                <img 
                  src={urlFor(member.image).width(300).height(300).url()} 
                  alt={member.name}
                />
              )}
              <h3>{member.name}</h3>
              <p class="role">{member.role}</p>
              <p class="bio">{member.bio}</p>
              <a href={`mailto:${member.email}`}>{member.email}</a>
            </div>
          ))}
        </div>
      </section>
    ))}
  </main>
</Layout>
```

### Example: Using Research Areas

```astro
---
// src/pages/research-cms.astro
import Layout from '../layouts/Layout.astro';
import { getResearchAreas, urlFor } from '../utils/sanity';
import { PortableText } from '@portabletext/react';

const researchAreas = await getResearchAreas();
---

<Layout title="Research">
  <main>
    <h1>Research Areas</h1>
    
    {researchAreas.map((area) => (
      <section id={area.slug.current}>
        <h2>{area.title}</h2>
        {area.summary && <p class="summary">{area.summary}</p>}
        
        {area.primaryImage && (
          <img 
            src={urlFor(area.primaryImage).width(600).height(400).url()} 
            alt={area.title}
          />
        )}
        
        {area.highlights && (
          <ul class="highlights">
            {area.highlights.map((highlight) => (
              <li>{highlight}</li>
            ))}
          </ul>
        )}
        
        {area.description && (
          <div class="description">
            <PortableText value={area.description} />
          </div>
        )}
      </section>
    ))}
  </main>
</Layout>
```

## Development Workflow

### For Content Editors

1. **Access the Studio**: Go to `http://localhost:3333` (when studio is running)
2. **Add/Edit Content**: Use the intuitive interface to manage content
3. **Preview Changes**: Content appears immediately on the website
4. **Publish**: Toggle the "Published" field to make content live

### For Developers

1. **Start Development**: `npm run dev` (Astro) + `npm run sanity:dev` (Studio)
2. **Query Data**: Use the helper functions in `src/utils/sanity.ts`
3. **Update Schemas**: Modify files in `sanity/schemas/` as needed
4. **Deploy Studio**: `npm run sanity:deploy` to host studio online

## Advanced Features

### Rich Text Content

The CMS supports rich text with:
- Headings, paragraphs, lists
- Bold, italic, code formatting
- Links and images
- Custom blocks

### Image Optimization

Sanity provides powerful image transformation:
```javascript
// Resize and optimize images
urlFor(image)
  .width(800)
  .height(600)
  .format('webp')
  .quality(80)
  .url()
```

### Real-time Collaboration

Multiple team members can edit content simultaneously with real-time updates.

## Deployment

### Studio Deployment

```bash
npm run sanity:deploy
```

This creates a hosted studio at `https://your-project-name.sanity.studio`

### Website Deployment

Your Astro site will automatically fetch content from Sanity during build time.

## Troubleshooting

### Common Issues

1. **"Project not found" error**: Check your `PUBLIC_SANITY_PROJECT_ID` in `.env`
2. **Studio won't start**: Ensure all dependencies are installed with `npm install`
3. **Images not loading**: Verify image URLs and check CORS settings in Sanity

### Getting Help

- [Sanity Documentation](https://www.sanity.io/docs)
- [Astro Integration Guide](https://docs.astro.build/en/guides/cms/sanity/)
- [Community Support](https://slack.sanity.io/)

## Content Migration

To migrate your existing content to Sanity:

1. **Team Members**: Use the studio to manually add team members from your current `team.astro`
2. **Research Areas**: Copy content from `research.astro` into research area documents
3. **Publications**: Add publications one by one or use Sanity's import tools

## Security & Access Control

- **Free Plan**: Up to 3 users, perfect for small labs
- **User Roles**: Control who can edit vs. view content
- **Version History**: Track all changes with rollback capability
- **API Tokens**: Secure access for integrations

This setup provides a robust, user-friendly CMS that will allow your colleagues to easily manage the website content after you leave! 