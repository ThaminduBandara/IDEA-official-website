import { defineField, defineType } from 'sanity'
import { reviewStatusField, formatReviewStatusSubtitle } from './reviewStatusField'

export const completedProjectType = defineType({
  name: 'completedProject',
  title: 'Completed Projects (Table Archive)',
  type: 'document',
  fields: [
    reviewStatusField,
    defineField({
      name: 'order',
      title: 'Project Number (#)',
      type: 'number',
      description: 'e.g. 56, 57... (Assign the next sequential number)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name of the Project',
      type: 'string',
      description: 'e.g. Climate Resilient Village Development Project - Kandy, Matara',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year / Timeline',
      type: 'string',
      description: 'e.g. 2024/26, 2021, 1996',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fundingAgency',
      title: 'Funding Agency / Partner',
      type: 'string',
      description: 'e.g. Bread for the World - Germany, UNDP-GEF/SGP, ARECOP',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'amountLkr',
      title: 'Total Amount (LKR)',
      type: 'number',
      description: 'Total grant or project amount in LKR (e.g. 57222738.80 - enter numbers only)',
    }),
    defineField({
      name: 'status',
      title: 'Project Status',
      type: 'string',
      options: {
        list: [
          { title: 'Completed', value: 'Completed' },
          { title: 'Ongoing', value: 'Ongoing' },
        ],
      },
      initialValue: 'Completed',
    }),
  ],
  preview: {
    select: {
      order: 'order',
      title: 'name',
      year: 'year',
      agency: 'fundingAgency',
      reviewStatus: 'reviewStatus',
    },
    prepare({ order, title, year, agency, reviewStatus }) {
      return {
        title: `${order ? `#${order} ` : ''}${title || 'Untitled Project'}`,
        subtitle: formatReviewStatusSubtitle(reviewStatus, `${year || ''} • ${agency || ''}`),
      }
    },
  },
})
