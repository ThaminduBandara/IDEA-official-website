import { defineField, defineType } from 'sanity'

export const heroSlideType = defineType({
  name: 'heroSlide',
  title: 'Hero Slideshow',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline Text',
      type: 'string',
      description: 'e.g. Building a Sustainable Future for Sri Lanka.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Top Tagline / Badge',
      type: 'string',
      description: 'e.g. Pioneer of "Anagi" Stoves, Renewable Energy & Eco-Villages',
      initialValue: 'Pioneer of "Anagi" Stoves, Renewable Energy & Eco-Villages',
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline / Description',
      type: 'text',
      rows: 3,
      description: 'Supporting description text shown below the headline',
    }),
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true, // Enables focal point cropping
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Image Caption',
      type: 'string',
      description: 'Brief description of the image for accessibility & slider metadata',
    }),
    defineField({
      name: 'order',
      title: 'Display Order (1, 2, 3...)',
      type: 'number',
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'caption',
      media: 'image',
    },
  },
})

export default heroSlideType
