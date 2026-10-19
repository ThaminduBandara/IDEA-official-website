import { defineField, defineType } from 'sanity'
import { reviewStatusField, formatReviewStatusSubtitle } from './reviewStatusField'

export const traineeStoryType = defineType({
  name: 'traineeStory',
  title: 'Trainee Stories & Testimonials',
  type: 'document',
  fields: [
    reviewStatusField,
    defineField({
      name: 'name',
      title: 'Trainee / Artisan Name',
      type: 'string',
      description: 'e.g. Kusumawathi Silva',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Occupation',
      type: 'string',
      description: 'e.g. Traditional Potter & Anagi Manufacturer',
    }),
    defineField({
      name: 'district',
      title: 'District / Location',
      type: 'string',
      description: 'e.g. Matara District, Kandy HQ Placement',
    }),
    defineField({
      name: 'story',
      title: 'Testimonial Quote / Story',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Trainee Photo (Optional)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      initialValue: 1,
      description: 'Lower numbers display first (1, 2, 3...)',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      reviewStatus: 'reviewStatus',
      media: 'photo',
    },
    prepare({ title, subtitle, reviewStatus, media }) {
      return {
        title: title || 'Anonymous Trainee',
        subtitle: formatReviewStatusSubtitle(reviewStatus, subtitle || 'Trainee Story'),
        media: media,
      }
    },
  },
})
