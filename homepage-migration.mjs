import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'fyi47z1v',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_TOKEN || '', // You'll need to set this
  apiVersion: '2023-10-01'
})

// Homepage content to migrate
const homepageContent = {
  _type: 'pageContent',
  pageId: 'home',
  title: 'Sheehan Lab',
  subtitle: 'Advancing Sickle Cell Disease Research and Treatment',
  content: [
    {
      _type: 'block',
      _key: 'mission',
      style: 'h2',
      children: [{ _type: 'span', text: 'Our Mission', marks: [] }]
    },
    {
      _type: 'block',
      _key: 'mission-text',
      style: 'normal',
      children: [{ 
        _type: 'span', 
        text: 'The Sheehan Lab is dedicated to developing and improving therapies for individuals living with sickle cell disease. Our multifaceted approach combines genomics, clinical research, and innovative biomarker development to better understand and treat this complex disease.',
        marks: [] 
      }]
    },
    {
      _type: 'block',
      _key: 'research-focus',
      style: 'h2',
      children: [{ _type: 'span', text: 'Research Focus', marks: [] }]
    },
    {
      _type: 'block',
      _key: 'genomics',
      style: 'h3',
      children: [{ _type: 'span', text: '🧬 Genomics & Therapy', marks: [] }]
    },
    {
      _type: 'block',
      _key: 'genomics-desc',
      style: 'normal',
      children: [{ 
        _type: 'span', 
        text: 'Identifying genetic factors and new drug targets to increase fetal hemoglobin levels.',
        marks: [] 
      }]
    },
    {
      _type: 'block',
      _key: 'pain-mgmt',
      style: 'h3',
      children: [{ _type: 'span', text: '🔬 Pain Management', marks: [] }]
    },
    {
      _type: 'block',
      _key: 'pain-mgmt-desc',
      style: 'normal',
      children: [{ 
        _type: 'span', 
        text: 'Investigating genetic factors in chronic pain development and biomarker research.',
        marks: [] 
      }]
    },
    {
      _type: 'block',
      _key: 'biomarkers',
      style: 'h3',
      children: [{ _type: 'span', text: '🧪 Biomarker Development', marks: [] }]
    },
    {
      _type: 'block',
      _key: 'biomarkers-desc',
      style: 'normal',
      children: [{ 
        _type: 'span', 
        text: 'Creating new methods to evaluate red cell function and therapy effectiveness.',
        marks: [] 
      }]
    },
    {
      _type: 'block',
      _key: 'gene-therapy',
      style: 'h3',
      children: [{ _type: 'span', text: '🩸 Gene-Based Therapies', marks: [] }]
    },
    {
      _type: 'block',
      _key: 'gene-therapy-desc',
      style: 'normal',
      children: [{ 
        _type: 'span', 
        text: 'Evaluating and improving gene therapy approaches for better patient outcomes.',
        marks: [] 
      }]
    }
  ],
  seo: {
    metaTitle: 'Sheehan Lab | Sickle Cell Disease Research at Emory University',
    metaDescription: 'The Sheehan Lab at Emory University is dedicated to developing and improving therapies for individuals living with sickle cell disease through genomics, clinical research, and biomarker development.',
    keywords: ['sickle cell disease', 'research', 'Emory University', 'genomics', 'gene therapy', 'biomarkers', 'pain management', 'fetal hemoglobin']
  },
  lastUpdated: new Date().toISOString(),
  isPublished: true
}

async function migrateHomepageContent() {
  try {
    console.log('🚀 Starting homepage content migration...')
    
    // Check if homepage content already exists
    const existing = await client.fetch('*[_type == "pageContent" && pageId == "home"][0]')
    
    if (existing) {
      console.log('📝 Updating existing homepage content...')
      const result = await client
        .patch(existing._id)
        .set(homepageContent)
        .commit()
      console.log('✅ Homepage content updated successfully!')
      console.log('Updated document ID:', result._id)
    } else {
      console.log('📝 Creating new homepage content...')
      const result = await client.create(homepageContent)
      console.log('✅ Homepage content created successfully!')
      console.log('New document ID:', result._id)
    }
    
    console.log('\n🎉 Migration completed! You can now:')
    console.log('1. Visit your Sanity Studio to see the homepage content')
    console.log('2. Add a hero image if desired')
    console.log('3. Customize the content as needed')
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message)
    if (error.message.includes('token')) {
      console.log('\n💡 Make sure to set your SANITY_TOKEN environment variable:')
      console.log('export SANITY_TOKEN=your_sanity_token_here')
      console.log('\nYou can get a token from: https://sanity.io/manage')
    }
  }
}

// Run the migration
migrateHomepageContent() 