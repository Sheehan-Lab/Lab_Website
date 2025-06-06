import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'position',
  title: 'Job Position',
  type: 'document',
  icon: () => '💼',
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Emory University – Sheehan Lab',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Position Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-Time', value: 'Full-Time' },
          { title: 'Part-Time', value: 'Part-Time' },
          { title: 'Training Position', value: 'Training Position' },
          { title: 'Internship', value: 'Internship' },
          { title: 'Fellowship', value: 'Fellowship' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Position Description',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'applicationLink',
      title: 'Application Link',
      type: 'url',
      description: 'Link to the official job posting or application form',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Position Active',
      type: 'boolean',
      description: 'Uncheck to hide this position from the website',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this position appears (lower numbers first)',
      initialValue: 1,
    }),
    defineField({
      name: 'postedDate',
      title: 'Posted Date',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0],
    }),
    defineField({
      name: 'applicationDeadline',
      title: 'Application Deadline',
      type: 'date',
      description: 'Optional deadline for applications',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
      isActive: 'isActive',
    },
    prepare({ title, subtitle, isActive }) {
      return {
        title: `${title} ${isActive ? '✅' : '❌'}`,
        subtitle,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Posted Date (Newest First)',
      name: 'postedDesc',
      by: [{ field: 'postedDate', direction: 'desc' }],
    },
  ],
}) 