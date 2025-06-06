#!/usr/bin/env node

/**
 * NDJSON Import Creator for Sanity
 * 
 * This script converts our JSON migration files to NDJSON format
 * that can be imported using Sanity CLI's bulk import feature.
 */

import { readFileSync, writeFileSync } from 'fs';

function createNDJSONImport() {
  console.log('🚀 Creating NDJSON import file for Sanity CLI...\n');

  try {
    // Read the JSON files
    const teamMembers = JSON.parse(readFileSync('sanity-team-members.json', 'utf8'));
    const researchAreas = JSON.parse(readFileSync('sanity-research-areas.json', 'utf8'));
    const homeContent = JSON.parse(readFileSync('sanity-home-content.json', 'utf8'));

    // Convert to NDJSON format (one JSON object per line)
    let ndjsonContent = '';
    
    // Add home page content first
    ndjsonContent += JSON.stringify(homeContent) + '\n';
    
    // Add team members
    teamMembers.forEach(member => {
      // Remove the localPath reference and replace with placeholder
      const cleanMember = { ...member };
      if (cleanMember.image?.localPath) {
        cleanMember.image = {
          _type: 'image',
          _sanityAsset: `image@file://./public${cleanMember.image.localPath}`
        };
      }
      ndjsonContent += JSON.stringify(cleanMember) + '\n';
    });
    
    // Add research areas
    researchAreas.forEach(area => {
      // Clean up image references
      const cleanArea = { ...area };
      if (cleanArea.primaryImage?.localPath) {
        cleanArea.primaryImage = {
          _type: 'image',
          _sanityAsset: `image@file://./public${cleanArea.primaryImage.localPath}`
        };
      }
      if (cleanArea.secondaryImage?.localPath) {
        cleanArea.secondaryImage = {
          _type: 'image',
          _sanityAsset: `image@file://./public${cleanArea.secondaryImage.localPath}`
        };
      }
      ndjsonContent += JSON.stringify(cleanArea) + '\n';
    });

    // Write NDJSON file
    writeFileSync('sanity-import.ndjson', ndjsonContent);

    console.log('✅ NDJSON import file created successfully!');
    console.log('📁 File: sanity-import.ndjson');
    console.log(`📊 Documents: ${teamMembers.length + researchAreas.length + 1}`);
    console.log('\n🚀 To import automatically, run:');
    console.log('   sanity dataset import sanity-import.ndjson production --replace');
    console.log('\n📋 Command flags:');
    console.log('   --replace    : Overwrite existing documents');
    console.log('   --missing    : Only import missing documents');
    console.log('   --allow-failing-assets : Continue if some images fail');
    console.log('\n⚠️  Note: Make sure image files exist in public/images/ folders');

  } catch (error) {
    console.error('❌ Error creating NDJSON file:', error.message);
    console.log('\n💡 Make sure you ran "node migrate-content.mjs" first!');
  }
}

createNDJSONImport(); 