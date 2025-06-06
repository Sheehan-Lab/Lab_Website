import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url/lib/types/types'

// Your actual Sanity project details
const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || 'fyi47z1v'
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2024-06-13'

// A `SANITY_AUTH_TOKEN` environment variable must be set to run this on the server.
// You can get one from `https://www.sanity.io/manage/project/fyi47z1v/api#auth`
const token = process.env.SANITY_AUTH_TOKEN

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // If a token is provided, use it. This will bypass the CDN and give you fresh data.
  // It's useful for previewing drafts and ensuring you see the latest content.
  // Otherwise, `useCdn: true` is recommended for production performance.
  token: token,
  useCdn: !token,
})

// Helper for generating image URLs
const builder = imageUrlBuilder(client)

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
  mission?: string
  researchHighlights?: {
    icon?: string;
    title?: string;
    text?: string;
  }[]
  content?: any[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
  }
  lastUpdated: string
  isPublished: boolean
}

export interface Position {
  _id: string
  title: string
  slug: { current: string }
  location: string
  type: string
  description: string
  requirements: string
  applicationLink: string
  isActive: boolean
  order?: number
  postedDate?: string
  applicationDeadline?: string
}

// Query functions
export async function getTeamMembers(): Promise<TeamMember[]> {
  return await client.fetch(`
    *[_type == "teamMember" && isActive == true] | order(order asc, name asc)
  `)
}

export async function getResearchAreas(): Promise<ResearchArea[]> {
  return await client.fetch(`
    *[_type == "researchArea" && isPublished == true] | order(order asc, title asc)
  `)
}

export async function getPublications(): Promise<Publication[]> {
  return await client.fetch(`
    *[_type == "publication" && isPublished == true] | order(year desc, title asc)
  `)
}

export async function getFeaturedPublications(): Promise<any[]> {
  const query = `*[_type == "publication" && isPublished == true && featured == true] | order(year desc, title asc)`
  const publications = await client.fetch(query)
  return publications.slice(0, 3)
}

export async function getPageContent(pageId: string): Promise<PageContent | null> {
  return await client.fetch(`
    *[_type == "pageContent" && pageId == $pageId && isPublished == true][0]
  `, {pageId})
}

export async function getGallery(slug: string) {
  const query = `*[_type == "gallery" && slug.current == $slug][0] {
    title,
    description,
    photos[]{
      alt,
      asset
    }
  }`;
  const gallery = await client.fetch(query, { slug });
  if (gallery && gallery.photos) {
    gallery.photos = gallery.photos.map((photo: { asset: SanityImageSource; alt: string }) => ({
      alt: photo.alt,
      src: urlFor(photo.asset).url()
    }));
  }
  return gallery;
}

export async function getPositions(): Promise<Position[]> {
  return await client.fetch(`
    *[_type == "position" && isActive == true] | order(order asc, postedDate desc)
  `);
} 