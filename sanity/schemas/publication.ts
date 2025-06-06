import {defineType, defineField} from 'sanity'

export const publication = defineType({
  name: 'publication',
  title: 'Publication',
  type: 'document',
  icon: () => '📄',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'journal',
      title: 'Journal',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required().min(1900).max(new Date().getFullYear() + 5),
    }),
    defineField({
      name: 'volume',
      title: 'Volume',
      type: 'string',
    }),
    defineField({
      name: 'issue',
      title: 'Issue',
      type: 'string',
    }),
    defineField({
      name: 'pages',
      title: 'Pages',
      type: 'string',
    }),
    defineField({
      name: 'doi',
      title: 'DOI',
      type: 'string',
      description: 'Digital Object Identifier',
    }),
    defineField({
      name: 'pmid',
      title: 'PMID',
      type: 'string',
      description: 'PubMed ID',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Link to publication',
    }),
    defineField({
      name: 'abstract',
      title: 'Abstract',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'type',
      title: 'Publication Type',
      type: 'string',
      options: {
        list: [
          {title: 'Journal Article', value: 'journal'},
          {title: 'Conference Paper', value: 'conference'},
          {title: 'Book Chapter', value: 'chapter'},
          {title: 'Preprint', value: 'preprint'},
          {title: 'Review', value: 'review'},
        ]
      },
      initialValue: 'journal',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Publication',
      type: 'boolean',
      description: 'Mark as featured to highlight on main pages',
      initialValue: false,
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
      subtitle: 'journal',
      year: 'year',
    },
    prepare(selection) {
      const {title, subtitle, year} = selection
      return {
        title,
        subtitle: `${subtitle} (${year})`,
      }
    },
  },
  orderings: [
    {
      title: 'Year (newest first)',
      name: 'yearDesc',
      by: [{field: 'year', direction: 'desc'}]
    },
    {
      title: 'Year (oldest first)',
      name: 'yearAsc',
      by: [{field: 'year', direction: 'asc'}]
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}]
    }
  ]
}) 