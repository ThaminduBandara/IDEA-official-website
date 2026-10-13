import { defineField, defineType } from 'sanity'

export const trainingProgramType = defineType({
  name: 'trainingProgram',
  title: 'Training Programs',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Program Title',
      type: 'string',
      description: 'e.g. Ceramic Cookstove Artisan & Potter Training',
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
      name: 'category',
      title: 'Training Category',
      type: 'string',
      options: {
        list: [
          { title: 'Vocational & Artisan Development', value: 'Vocational & Artisan Development' },
          { title: 'Academic & Research Partnerships', value: 'Academic & Research Partnerships' },
          { title: 'Community Empowerment', value: 'Community Empowerment' },
          { title: 'Technical & Industrial Skills', value: 'Technical & Industrial Skills' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'audience',
      title: 'Target Audience',
      type: 'string',
      description: 'e.g. Rural Potters, Women Artisans & Youth',
    }),
    defineField({
      name: 'duration',
      title: 'Duration & Format',
      type: 'string',
      description: 'e.g. 2 to 4 Weeks Practical Hands-on Workshop',
    }),
    defineField({
      name: 'image',
      title: 'Program Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Workshop or training session photo',
    }),
    defineField({
      name: 'description',
      title: 'Program Description',
      type: 'text',
      rows: 4,
      description: 'Detailed description of curriculum, objectives, and training methodology',
    }),
    defineField({
      name: 'outcomes',
      title: 'Program Learning Outcomes',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key skills and certifications acquired upon completion',
    }),
    defineField({
      name: 'impactStat',
      title: 'Impact Metric / Historical Reach',
      type: 'string',
      description: 'e.g. Over 350+ Rural Potters Trained Nationwide',
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
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Untitled Program',
        subtitle: subtitle || 'Training Program',
        media: media,
      }
    },
  },
})
