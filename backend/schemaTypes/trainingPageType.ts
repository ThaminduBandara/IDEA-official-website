import { defineField, defineType } from 'sanity'

export const trainingPageType = defineType({
  name: 'trainingPage',
  title: 'Training Page (Banner, Stats & CTA)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      initialValue: 'Training Page Header & Banner',
      readOnly: true,
    }),

    // --- HERO BANNER ---
    defineField({
      name: 'badge',
      title: 'Top Badge Pill',
      type: 'string',
      initialValue: 'Capacity Building & Community Empowerment',
      description: 'The green pill badge above the main title',
    }),
    defineField({
      name: 'headline',
      title: 'Main Headline',
      type: 'string',
      initialValue: 'Training & Trainees',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Hero Subtitle Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Developing grassroots skills, certifying local artisans, and nurturing the next generation of environmental researchers across Sri Lanka.',
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
          name: 'trainingStatCard',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Users / People (Trainees)', value: 'users' },
                  { title: 'Book / Education (Workshops)', value: 'bookOpen' },
                  { title: 'Award / Certification', value: 'award' },
                  { title: 'Graduation Cap (Internships)', value: 'graduationCap' },
                  { title: 'Clock / Experience', value: 'clock' },
                  { title: 'Map Pin / Districts', value: 'mapPin' },
                  { title: 'Heart / Community', value: 'heart' },
                ],
              },
              initialValue: 'users',
            }),
            defineField({
              name: 'title',
              title: 'Stat Value / Title',
              type: 'string',
              description: 'e.g. 1,500+, 25+ Annual, 15+ Universities',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Stat Subtitle / Description',
              type: 'string',
              description: 'e.g. Total trained artisans & leaders',
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

    // --- TRAINING PROGRAMS SECTION HEADINGS ---
    defineField({
      name: 'sectionTitle',
      title: 'Programs Section Title',
      type: 'string',
      initialValue: 'Our Core Training Programs',
    }),
    defineField({
      name: 'sectionSubtitle',
      title: 'Programs Section Subtitle',
      type: 'text',
      rows: 2,
      initialValue:
        'Combining traditional community knowledge with modern sustainable engineering to build self-reliant livelihoods.',
    }),

    // --- TRAINEE STORIES SECTION HEADINGS ---
    defineField({
      name: 'storiesBadge',
      title: 'Stories Section Badge',
      type: 'string',
      initialValue: 'Voices from the Field',
    }),
    defineField({
      name: 'storiesTitle',
      title: 'Stories Section Title',
      type: 'string',
      initialValue: 'Trainee Stories & Impact',
    }),
    defineField({
      name: 'storiesSubtitle',
      title: 'Stories Section Subtitle',
      type: 'text',
      rows: 2,
      initialValue:
        'Hear from artisans, university scholars, and village leaders who took part in IDEA training programs.',
    }),

    // --- BOTTOM CTA SECTION ---
    defineField({
      name: 'ctaTitle',
      title: 'CTA Section Headline',
      type: 'string',
      initialValue: 'Interested in Joining an Upcoming Training Cohort or Internship?',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Section Description',
      type: 'text',
      rows: 3,
      initialValue:
        'We regularly welcome university students, research fellows, community groups, and artisan cooperatives. Reach out to our training coordinator at Kundasale Head Office.',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'Primary CTA Button Label',
      type: 'string',
      initialValue: 'Contact Training Coordinator',
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
      initialValue: 'Download Course Material & Guides',
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
        title: title || 'Training Page Banner',
        subtitle: subtitle || 'Hero & Banner Settings',
        media: media,
      }
    },
  },
})
