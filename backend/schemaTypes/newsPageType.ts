import { defineField, defineType } from 'sanity'

export const newsPageType = defineType({
  name: 'newsPage',
  title: 'News & Events Page (Banner & Stats)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      initialValue: 'News & Events Page Header & Banner',
      readOnly: true,
    }),

    // --- HERO BANNER ---
    defineField({
      name: 'badge',
      title: 'Top Badge Pill',
      type: 'string',
      initialValue: '35+ Years Sustainable Impact • Est. 1990',
      description: 'The green pill badge above the main title',
    }),
    defineField({
      name: 'headline',
      title: 'Main Headline',
      type: 'string',
      initialValue: 'News & Events',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Hero Subtitle Description',
      type: 'text',
      rows: 3,
      initialValue:
        "Stay updated with IDEA's latest activities, workshops, press releases, and contributions to sustainable development across Sri Lanka.",
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
          name: 'newsStatCard',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Newspaper / News (Announcements)', value: 'newspaper' },
                  { title: 'Calendar / Events (Workshops)', value: 'calendar' },
                  { title: 'Map Pin / Location (Districts)', value: 'mapPin' },
                  { title: 'Megaphone / Updates (Press)', value: 'megaphone' },
                  { title: 'Award / Impact', value: 'award' },
                  { title: 'Users / Community', value: 'users' },
                ],
              },
              initialValue: 'newspaper',
            }),
            defineField({
              name: 'title',
              title: 'Card Title / Metric',
              type: 'string',
              description: 'e.g. 100+ News & Updates or 25+ Annual Workshops',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Card Subtitle / Description',
              type: 'string',
              description: 'e.g. Latest announcements & press releases',
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
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'badge',
      media: 'backgroundImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'News & Events Header',
        subtitle: subtitle || 'Hero Banner & Stats Cards',
        media: media,
      }
    },
  },
})
