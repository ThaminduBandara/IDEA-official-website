import { defineField, defineType } from 'sanity'
import { reviewStatusField } from './reviewStatusField'

export const galleryPageType = defineType({
  name: 'galleryPage',
  title: 'Gallery Page (Banner & Stream Headers)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      initialValue: 'Media & Gallery Page Header & Settings',
      readOnly: true,
    }),

    // --- HERO BANNER ---
    defineField({
      name: 'badge',
      title: 'Top Badge Pill',
      type: 'string',
      initialValue: '35+ Years of Sustainable Impact • Est. 1990',
      description: 'The green pill badge above the main title',
    }),
    defineField({
      name: 'headline',
      title: 'Main Headline',
      type: 'string',
      initialValue: 'Media Gallery',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Hero Subtitle Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Explore three decades of grassroots environmental action, renewable energy innovations, and community empowerment across Sri Lanka captured through photos and documentaries.',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Cinematic full-width background photo behind the hero banner',
    }),

    // --- 3 FLOATING GLASS STAT CARDS ---
    defineField({
      name: 'statsCards',
      title: 'Floating Glass Stat Cards (3 cards)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'galleryStatCard',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Camera / Photos', value: 'camera' },
                  { title: 'Video / Film', value: 'video' },
                  { title: 'Map Pin / Districts', value: 'mapPin' },
                  { title: 'Users / Communities', value: 'users' },
                  { title: 'Flame / Clean Energy', value: 'flame' },
                  { title: 'Award / Legacy', value: 'award' },
                ],
              },
              initialValue: 'camera',
            }),
            defineField({
              name: 'title',
              title: 'Card Title / Metric',
              type: 'string',
              description: 'e.g. 500+ Field Photos or 25+ Districts Covered',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Card Subtitle / Description',
              type: 'string',
              description: 'e.g. Grassroots archives since 1990',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
              icon: 'icon',
            },
            prepare({ title, subtitle, icon }) {
              return {
                title: title || 'Stat Card',
                subtitle: `${icon ? `[${icon}] ` : ''}${subtitle || ''}`,
              }
            },
          },
        },
      ],
      initialValue: [
        {
          icon: 'camera',
          title: '500+ Field Photos',
          subtitle: 'Grassroots visual archives',
        },
        {
          icon: 'video',
          title: '25+ Video Stories',
          subtitle: 'Documentaries & interviews',
        },
        {
          icon: 'mapPin',
          title: '25 Districts',
          subtitle: 'Island-wide impact documented',
        },
      ],
    }),

    // --- SECTION STREAM HEADERS ---
    defineField({
      name: 'sectionTitle',
      title: 'Gallery Stream Headline',
      type: 'string',
      initialValue: 'Our Fieldwork & Media Moments',
      description: 'Main heading above the cards on the light background',
    }),

    defineField({
      name: 'sectionSubtitle',
      title: 'Gallery Stream Subtitle',
      type: 'string',
      initialValue: 'Click any gallery card to explore the collection of photos and videos.',
      description: 'Instruction text below the gallery stream headline',
    }),

    // Workflow Review Field
    reviewStatusField,
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'badge',
      media: 'backgroundImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Media Gallery Header',
        subtitle: subtitle || 'Hero Banner & Stats Cards',
        media: media,
      }
    },
  },
})
