import {defineType, defineField} from 'sanity'

export const pageContent = defineType({
  name: 'pageContent',
  title: 'Page Content',
  type: 'document',
  icon: () => '📝',
  fields: [
    defineField({
      name: 'pageId',
      title: 'Page ID',
      type: 'string',
      description: 'Unique identifier for the page (e.g., "home", "about", "contact")',
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'mission',
      title: 'Mission Statement',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'researchHighlights',
      title: 'Research Highlights',
      type: 'array',
      of: [
        defineField({
          name: 'highlight',
          type: 'object',
          fields: [
            { name: 'icon', title: 'Icon (emoji)', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'text', title: 'Text', type: 'text' },
          ]
        })
      ]
    }),
    defineField({
      name: 'content',
      title: 'Main Content (Old)',
      type: 'array',
      of: [ { type: 'block' } ],
      description: 'This field is deprecated. Please move content to Mission and Research Highlights.',
      readOnly: true,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{type: 'string'}],
        }
      ]
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'pageId',
      media: 'heroImage',
    },
  },
}) 