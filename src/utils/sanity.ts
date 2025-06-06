import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url/lib/types/types'

// Your actual Sanity project details
const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || 'fyi47z1v'
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production'

export const sanityClient = createClient({
  projectId,
  dataset,
  useCdn: true, // Use CDN for faster reads
  apiVersion: '2024-01-01', // Use current date
})

// Helper for generating image URLs
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Type definitions for our schemas
export interface TeamMember {
  _id: string
  name: string
  role: string
  group: 'pi' | 'lab_manager' | 'faculty' | 'research_staff'
  bio: string
  email: string
  image?: any
  order?: number
  isActive: boolean
}

export interface ResearchArea {
  _id: string
  title: string
  slug: {current: string}
  summary?: string
  description?: any[]
  highlights?: string[]
  primaryImage?: any
  secondaryImage?: any
  order?: number
  isPublished: boolean
}

export interface Publication {
  _id: string
  title: string
  authors: string[]
  journal: string
  year: number
  volume?: string
  issue?: string
  pages?: string
  doi?: string
  pmid?: string
  url?: string
  abstract?: string
  type: 'journal' | 'conference' | 'chapter' | 'preprint' | 'review'
  featured: boolean
  isPublished: boolean
}

export interface PageContent {
  _id: string
  pageId: string
  title: string
  subtitle?: string
  heroImage?: any
  content?: any[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
  }
  lastUpdated: string
  isPublished: boolean
}

// Query functions
export async function getTeamMembers(): Promise<TeamMember[]> {
  return await sanityClient.fetch(`
    *[_type == "teamMember" && isActive == true] | order(order asc, name asc)
  `)
}

export async function getResearchAreas(): Promise<ResearchArea[]> {
  return await sanityClient.fetch(`
    *[_type == "researchArea" && isPublished == true] | order(order asc, title asc)
  `)
}

export async function getPublications(): Promise<Publication[]> {
  return await sanityClient.fetch(`
    *[_type == "publication" && isPublished == true] | order(year desc, title asc)
  `)
}

export async function getFeaturedPublications(): Promise<Publication[]> {
  return await sanityClient.fetch(`
    *[_type == "publication" && isPublished == true && featured == true] | order(year desc, title asc)
  `)
}

export async function getPageContent(pageId: string): Promise<PageContent | null> {
  return await sanityClient.fetch(`
    *[_type == "pageContent" && pageId == $pageId && isPublished == true][0]
  `, {pageId})
} 