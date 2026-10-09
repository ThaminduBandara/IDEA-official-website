import { defineField, defineType } from 'sanity'

export const projectsPageType = defineType({
  name: 'projectsPage',
  title: 'Projects Page (Banner & Stats)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      initialValue: 'Projects Page Header & Banner',
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
      initialValue: 'Our Projects',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Hero Subtitle Description',
      type: 'text',
      rows: 3,
      initialValue:
        "Discover IDEA's impactful initiatives in sustainable development, renewable energy, bio-mass cooking, and environmental conservation across Sri Lanka and South Asia.",
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
          name: 'projectStatCard',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Award / Trophy (Initiatives)', value: 'award' },
                  { title: 'Clock / Time (Years Impact)', value: 'clock' },
                  { title: 'Map Pin / Location (Districts)', value: 'mapPin' },
                  { title: 'Users / People (Beneficiaries)', value: 'users' },
                  { title: 'Leaf / Eco (Conservation)', value: 'leaf' },
                  { title: 'Zap / Energy (Clean Power)', value: 'zap' },
                ],
              },
              initialValue: 'award',
            }),
            defineField({
              name: 'title',
              title: 'Card Title / Metric',
              type: 'string',
              description: 'e.g. 50+ Initiatives or 35+ Years Impact',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Card Subtitle / Description',
              type: 'string',
              description: 'e.g. Implemented nationwide across Sri Lanka',
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

    // --- STREAM SECTION HEADER ---
    defineField({
      name: 'sectionTitle',
      title: 'Projects Grid Section Title',
      type: 'string',
      initialValue: 'Our Projects',
      description: 'Title above the search bar and project cards',
    }),
    defineField({
      name: 'sectionSubtitle',
      title: 'Projects Grid Section Subtitle',
      type: 'text',
      rows: 2,
      initialValue:
        "Discover IDEA's impactful initiatives in sustainable development, renewable energy, and environmental conservation across Sri Lanka.",
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
        title: title || 'Projects Page Header',
        subtitle: subtitle || 'Hero Banner & Stats Cards',
        media: media,
      }
    },
  },
})
