import { defineField, defineType } from 'sanity'

export const downloadsPageType = defineType({
  name: 'downloadsPage',
  title: 'Downloads Page (Banner, Stats & CTA)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      initialValue: 'Downloads & Resources Page Header & Banner',
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
      initialValue: 'Downloads & Resources',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Hero Subtitle Description',
      type: 'text',
      rows: 3,
      initialValue:
        "Access important documents, reports, guidelines, policy briefs, and educational resources related to IDEA's sustainable development initiatives.",
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
          name: 'downloadsStatCard',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Folder / Publications (FolderDown)', value: 'folderDown' },
                  { title: 'Shield / Free Access (ShieldCheck)', value: 'shieldCheck' },
                  { title: 'Book / Categories (BookOpen)', value: 'bookOpen' },
                  { title: 'Download / Files (Download)', value: 'download' },
                  { title: 'File / Document (FileText)', value: 'fileText' },
                  { title: 'Award / Excellence (Award)', value: 'award' },
                ],
              },
              initialValue: 'folderDown',
            }),
            defineField({
              name: 'title',
              title: 'Card Title / Metric',
              type: 'string',
              description: 'e.g. 50+ Publications or 100% Free Access',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Card Subtitle / Description',
              type: 'string',
              description: 'e.g. Public policy reports & research studies',
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

    // --- SECTION HEADINGS ---
    defineField({
      name: 'browseTitle',
      title: 'Browse Section Title',
      type: 'string',
      initialValue: 'Browse Resources',
    }),
    defineField({
      name: 'browseSubtitle',
      title: 'Browse Section Subtitle',
      type: 'string',
      initialValue: 'Discover and download valuable resources from our comprehensive collection',
    }),

    // --- BOTTOM CTA BANNER ---
    defineField({
      name: 'ctaTitle',
      title: 'Bottom CTA Title',
      type: 'string',
      initialValue: 'Need Additional Documentation or Custom Reports?',
    }),
    defineField({
      name: 'ctaText',
      title: 'Bottom CTA Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Our teams provide custom project evaluations, research papers, and administrative documentation upon request. Contact our Kundasale head office.',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Contact IDEA Office',
    }),
    defineField({
      name: 'ctaButtonLink',
      title: 'CTA Button Link',
      type: 'string',
      initialValue: '/contact',
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
        title: title || 'Downloads Page Header',
        subtitle: subtitle || 'Hero Banner & Stats Cards',
        media: media,
      }
    },
  },
})

export default downloadsPageType
