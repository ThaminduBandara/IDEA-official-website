import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
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
      name: 'subtitle',
      title: 'Subtitle / Funding Tag',
      type: 'string',
      description: 'e.g. Funded by SGP / GEF / UNDP',
    }),
    defineField({
      name: 'featuredTag',
      title: 'Featured Pill Tag',
      type: 'string',
      description: 'e.g. Flagship Project, Biomass Innovation, Anagi Heritage',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Feature on Homepage Slider?',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle on to showcase this project on the Home Page carousel',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (e.g. 1, 2, 3)',
      initialValue: 10,
    }),
    defineField({
      name: 'status',
      title: 'Project Status',
      type: 'string',
      options: {
        list: [
          { title: 'Ongoing', value: 'Ongoing' },
          { title: 'Completed', value: 'Completed' },
        ],
        layout: 'radio',
      },
      initialValue: 'Ongoing',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'Energy Efficiency',
          'Climate Action',
          'Community Development',
          'Environmental Conservation',
          'Sustainable Agriculture',
          'Waste Management',
          'Education & Training',
        ],
      },
    }),

    // --- SIDEBAR DETAILS ---
    defineField({
      name: 'location',
      title: 'Location / Target Region',
      type: 'string',
      description: 'e.g. Anuradhapura District or Matara & Kandy Districts',
    }),
    defineField({
      name: 'beneficiaries',
      title: 'Beneficiaries',
      type: 'string',
      description: 'e.g. 500 Families or 1000+ Households',
    }),
    defineField({
      name: 'duration',
      title: 'Duration / Timeline',
      type: 'string',
      description: 'e.g. 2022 - Present or Ongoing (2022 - Present)',
    }),
    defineField({
      name: 'budget',
      title: 'Budget',
      type: 'string',
      description: 'e.g. 1,500,000 LKR or 981725LKR',
    }),
    defineField({
      name: 'partners',
      title: 'Partners / Funder',
      type: 'string',
      description: 'e.g. SGP / GEF / UNDP / Dept. of Agriculture',
    }),

    // --- IMAGES & GALLERY ---
    defineField({
      name: 'image',
      title: 'Main Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Project Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      description: 'Upload field photos to show in the Project Gallery slider',
    }),

    // --- MAIN CONTENT SECTIONS ---
    defineField({
      name: 'aboutThisProject',
      title: 'About This Project',
      type: 'text',
      rows: 6,
      description: 'Detailed description paragraph about the project background and activities',
    }),
    defineField({
      name: 'objectivesText',
      title: 'Project Objectives',
      type: 'text',
      rows: 5,
      description: 'Detailed text describing key project objectives and interventions',
    }),
    defineField({
      name: 'outcomesText',
      title: 'Expected Outcomes',
      type: 'text',
      rows: 5,
      description: 'Detailed text describing expected results and environmental impacts',
    }),

    // --- STRUCTURED KEY OBJECTIVES & IMPACT STATS ---
    defineField({
      name: 'keyObjectives',
      title: 'Key Objectives Bullet Points',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'impactStats',
      title: 'Impact Statistics Callouts',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'impactStat',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'value', title: 'Metric Value', type: 'string' }),
            defineField({ name: 'desc', title: 'Short Description', type: 'string' }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'value',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Impact Stat',
                subtitle: subtitle || '',
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Untitled Project',
        subtitle: subtitle || 'IDEA Project',
        media: media,
      }
    },
  },
})
