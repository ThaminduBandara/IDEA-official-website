import { defineField, defineType } from 'sanity'

export const aboutType = defineType({
  name: 'aboutInfo',
  title: 'About Page / Vision & Mission',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      initialValue: 'Vision, Mission & Approach',
      readOnly: true,
    }),

    // --- VISION ---
    defineField({
      name: 'visionTitle',
      title: 'Vision Title',
      type: 'string',
      initialValue: 'Our Vision',
    }),
    defineField({
      name: 'visionText',
      title: 'Vision Description Text',
      type: 'text',
      rows: 4,
      description: 'Describe the organization long-term vision',
    }),

    // --- MISSION ---
    defineField({
      name: 'missionTitle',
      title: 'Mission Title',
      type: 'string',
      initialValue: 'Our Mission',
    }),
    defineField({
      name: 'missionText',
      title: 'Mission Description Text',
      type: 'text',
      rows: 5,
      description: 'Describe the core mission and focus of IDEA',
    }),

    // --- APPROACH ---
    defineField({
      name: 'approachTitle',
      title: 'Approach Title',
      type: 'string',
      initialValue: 'Our Approach',
    }),
    defineField({
      name: 'approachLeadText',
      title: 'Approach Intro Text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'approachHighlight',
      title: 'Approach Bold Highlight Quote',
      type: 'string',
      initialValue: 'Development must be integrated, not divided by sectors.',
    }),
    defineField({
      name: 'approachClosingText',
      title: 'Approach Summary / Closing Text',
      type: 'text',
      rows: 3,
    }),

    // --- HOW WE WORK ---
    defineField({
      name: 'howWeWorkTitle',
      title: 'How We Work Section Title',
      type: 'string',
      initialValue: 'How We Work',
    }),
    defineField({
      name: 'howWeWorkParagraph1',
      title: 'How We Work Paragraph 1 (Organization Background)',
      type: 'text',
      rows: 4,
      initialValue: 'IDEA is a registered non-profit, non-governmental organization based in Kandy which was established in March 1990 with the aim of playing an active role in contributing towards sustainable development efforts in the field of natural resource development, management, and conservation.',
    }),
    defineField({
      name: 'howWeWorkParagraph2',
      title: 'How We Work Paragraph 2 (Board of Management)',
      type: 'text',
      rows: 4,
      initialValue: 'A multi-disciplinary Board consisting of six non-related members manages it voluntarily. The main strength of IDEA lies on the Board of Management which comprises members who are professionally qualified, experienced, and well-known in development circles.',
    }),
    defineField({
      name: 'howWeWorkImage',
      title: 'How We Work Section Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Upload team / office photo shown on the right side of How We Work',
    }),
    defineField({
      name: 'howWeWorkImageCaption',
      title: 'How We Work Image Caption',
      type: 'string',
      initialValue: 'IDEA Board of Management & Executive Team in Kandy',
    }),

    // --- PRINCIPAL AREAS OF INTEREST ---
    defineField({
      name: 'principalAreasTitle',
      title: 'Principal Areas Section Title',
      type: 'string',
      initialValue: 'Principal Areas of Interest',
    }),
    defineField({
      name: 'principalAreasSubtitle',
      title: 'Principal Areas Subtitle',
      type: 'text',
      rows: 2,
      initialValue: 'IDEA focuses on addressing critical environmental, energy, and biodiversity issues that are of community and national importance.',
    }),
    defineField({
      name: 'principalAreas',
      title: 'Principal Areas of Interest Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'principalArea',
          title: 'Principal Area Card',
          fields: [
            defineField({
              name: 'title',
              title: 'Area Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Short Description',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'iconName',
              title: 'Card Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Leaf (Environment / Nature)', value: 'Leaf' },
                  { title: 'Zap (Renewable Energy / Tech)', value: 'Zap' },
                  { title: 'Users (Social Welfare / People)', value: 'Users' },
                  { title: 'Heart (Community / Compassion)', value: 'Heart' },
                  { title: 'Target (Objectives / Focus)', value: 'Target' },
                  { title: 'Award (Achievements)', value: 'Award' },
                ],
              },
              initialValue: 'Leaf',
            }),
            defineField({
              name: 'bgImage',
              title: 'Card Background Image',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'bgImage',
            },
          },
        },
      ],
    }),

    // --- LEADERSHIP TEAM ---
    defineField({
      name: 'leadershipTitle',
      title: 'Leadership Section Title',
      type: 'string',
      initialValue: 'Our Leadership Team',
    }),
    defineField({
      name: 'leadershipSubtitle',
      title: 'Leadership Section Subtitle',
      type: 'text',
      rows: 2,
      initialValue: "Meet the dedicated professionals who guide IDEA's mission and vision for sustainable development.",
    }),
    defineField({
      name: 'leadershipTeam',
      title: 'Leadership & Board Members',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'leadershipMember',
          title: 'Leadership Member',
          fields: [
            defineField({
              name: 'name',
              title: 'Full Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Designation / Profession',
              type: 'string',
              description: 'e.g. Former Director IRDP, Retired Electrical Engineer',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Portrait Photo',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'phones',
              title: 'Contact Phone Numbers',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Add one or more phone numbers',
            }),
            defineField({
              name: 'email',
              title: 'Email Address',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              media: 'image',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'visionText',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Vision, Mission, Approach & Leadership',
        subtitle: subtitle ? `${subtitle.slice(0, 60)}...` : 'About Us Page Content',
      }
    },
  },
})

export default aboutType
