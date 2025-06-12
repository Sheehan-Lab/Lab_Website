import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'fyi47z1v',
  dataset: 'production',
  apiVersion: '2024-06-13',
  useCdn: false,
})

async function listTeamMembers() {
  const teamMembers = await client.fetch(`
    *[_type == "teamMember" && name match "*Ashwin*"] {
      _id,
      name,
      role,
      group,
      isActive,
      order
    }
  `)
  
  console.log('Team members matching "Ashwin":')
  teamMembers.forEach(member => {
    console.log(`\n${member.name}:`)
    console.log(`  ID: ${member._id}`)
    console.log(`  Role: ${member.role}`)
    console.log(`  Group: ${member.group}`)
    console.log(`  Active: ${member.isActive}`)
    console.log(`  Order: ${member.order}`)
  })
}

listTeamMembers().catch(console.error) 