import { defineField, defineType } from 'sanity'

export const technologiesPageType = defineType({
  name: 'technologiesPage',
  title: 'Technologies Page (Banner, Stats & CTA)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      initialValue: 'Technologies Page Header & Banner',
      readOnly: true,
    }),

    // --- HERO BANNER ---
    defineField({
      name: 'badge',
      title: 'Top Badge Pill',
      type: 'string',
      initialValue: '35+ Years of Renewable Energy Innovation • Est. 1990',
      description: 'The green pill badge above the main title',
    }),
    defineField({
      name: 'headline',
      title: 'Main Headline',
      type: 'string',
      initialValue: 'Renewable Energy Technologies',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Hero Subtitle Description',
      type: 'text',
      rows: 3,
      initialValue:
        "Discover IDEA's field-proven technological innovations in biomass energy, clean household cooking, solar thermal systems, and decentralized rural power.",
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
          name: 'techStatCard',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Flame (Biomass / Fire)', value: 'flame' },
                  { title: 'Factory (Industrial / Gasifiers)', value: 'factory' },
                  { title: 'Award / Trophy (Years & Standards)', value: 'award' },
                  { title: 'Zap / Energy (Clean Power)', value: 'zap' },
                  { title: 'Leaf / Eco (Sustainability)', value: 'leaf' },
                  { title: 'Droplets (Hydro / Water)', value: 'droplets' },
                  { title: 'Sun (Solar Thermal)', value: 'sun' },
                  { title: 'Layers (Biochar / Soil)', value: 'layers' },
                  { title: 'Users / People', value: 'users' },
                ],
              },
              initialValue: 'flame',
            }),
            defineField({
              name: 'title',
              title: 'Stat Value / Title',
              type: 'string',
              description: 'e.g. 1M+ Stoves, 50+ Gasifiers, 35+ Years',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Stat Subtitle / Description',
              type: 'string',
              description: 'e.g. Anagi clean biomass cookstoves deployed',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
            },
          },
        },
      ],
      description: 'The 3 glassmorphic statistics boxes floating on the right side of the hero header',
    }),

    // --- PORTFOLIO SECTION HEADINGS ---
    defineField({
      name: 'sectionTitle',
      title: 'Portfolio Section Title',
      type: 'string',
      initialValue: 'Our Technology Portfolio',
    }),
    defineField({
      name: 'sectionSubtitle',
      title: 'Portfolio Section Subtitle',
      type: 'text',
      rows: 2,
      initialValue:
        'Engineered for maximum thermal efficiency, low cost, local materials, and rural community empowerment.',
    }),

    // --- BOTTOM CTA SECTION ---
    defineField({
      name: 'ctaTitle',
      title: 'CTA Section Headline',
      type: 'string',
      initialValue: 'Need Renewable Energy Technical Advice or Demonstrations?',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Section Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Our engineering team at Kundasale Head Office provides technology adaptation, design consultancy, and field demonstrations for community organizations, small enterprises, and government projects.',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'Primary CTA Button Label',
      type: 'string',
      initialValue: 'Contact Engineering Team',
    }),
    defineField({
      name: 'ctaButtonLink',
      title: 'Primary CTA Button Link',
      type: 'string',
      initialValue: '/contact',
    }),
    defineField({
      name: 'ctaSecondaryButtonText',
      title: 'Secondary CTA Button Label',
      type: 'string',
      initialValue: 'Browse Technical Manuals',
    }),
    defineField({
      name: 'ctaSecondaryButtonLink',
      title: 'Secondary CTA Button Link',
      type: 'string',
      initialValue: '/downloads',
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
        title: title || 'Technologies Page Banner',
        subtitle: subtitle || 'Hero & Banner Settings',
        media: media,
      }
    },
  },
})
