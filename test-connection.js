// Test script to check Sanity connection and data
import {getCliClient} from 'sanity/cli'

const client = getCliClient()

async function testConnection() {
  try {
    console.log('🔍 Testing Sanity connection...')
    
    // Test basic connection
    const projects = await client.projects.list()
    console.log(`✅ Connected to Sanity. Found ${projects.length} projects.`)
    
    // Check team members
    const teamMembers = await client.fetch('*[_type == "teamMember"]')
    console.log(`👥 Team members found: ${teamMembers.length}`)
    
    if (teamMembers.length > 0) {
      console.log('📋 First team member:', teamMembers[0])
    }
    
    // Check research areas
    const researchAreas = await client.fetch('*[_type == "researchArea"]')
    console.log(`🔬 Research areas found: ${researchAreas.length}`)
    
    // Check published content
    const publishedTeam = await client.fetch('*[_type == "teamMember" && isActive == true]')
    const publishedResearch = await client.fetch('*[_type == "researchArea" && isPublished == true]')
    
    console.log(`✅ Published team members: ${publishedTeam.length}`)
    console.log(`✅ Published research areas: ${publishedResearch.length}`)
    
    if (publishedTeam.length === 0) {
      console.log('⚠️  No published team members found! Check if isActive = true in Sanity Studio')
    }
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message)
  }
}

testConnection() 