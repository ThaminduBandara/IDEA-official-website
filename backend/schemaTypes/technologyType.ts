import { defineField, defineType } from 'sanity'

export const technologyType = defineType({
  name: 'technology',
  title: 'Technologies (Renewable Energy)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Technology Name',
      type: 'string',
      description: 'e.g. Anagi Improved Cookstoves, Biomass Gasification Systems',
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
      title: 'Sector / Category',
      type: 'string',
      options: {
        list: [
          { title: 'Biomass & Household Energy', value: 'Biomass & Household Energy' },
          { title: 'Industrial Renewable Energy', value: 'Industrial Renewable Energy' },
          { title: 'Carbon Sequestration & Soil Health', value: 'Carbon Sequestration & Soil Health' },
          { title: 'Solar Agro-Processing', value: 'Solar Agro-Processing' },
          { title: 'Commercial Clean Cooking', value: 'Commercial Clean Cooking' },
          { title: 'Hydropower & Community Energy', value: 'Hydropower & Community Energy' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline / Sub-Headline',
      type: 'string',
      description: 'e.g. Sri Lanka’s National Standard Fuelwood-Saving Cookstove',
    }),
    defineField({
      name: 'icon',
      title: 'Card Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Flame (Biomass / Clean Cooking)', value: 'flame' },
          { title: 'Factory (Industrial / Gasifiers)', value: 'factory' },
          { title: 'Layers (Biochar / Pyrolysis)', value: 'layers' },
          { title: 'Sun (Solar Drying)', value: 'sun' },
          { title: 'Cpu (Commercial / Institutional)', value: 'cpu' },
          { title: 'Droplets (Micro-Hydro)', value: 'droplets' },
          { title: 'Zap (Clean Power)', value: 'zap' },
        ],
      },
      initialValue: 'flame',
    }),
    defineField({
      name: 'image',
      title: 'Featured Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'High-resolution photo showing this technology in operation',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Comprehensive overview of the engineering innovation, CISIR/national standards, and rural applicability.',
    }),
    defineField({
      name: 'features',
      title: 'Key Technical Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet points highlighting key engineering specs, savings, and benefits',
    }),
    defineField({
      name: 'efficiency',
      title: 'Efficiency / Impact Metric',
      type: 'string',
      description: 'e.g. 50% Fuelwood Savings, 60-70% Fuel Cost Reduction',
    }),
    defineField({
      name: 'deployment',
      title: 'Deployment / Track Record',
      type: 'string',
      description: 'e.g. Over 1 Million+ Units Distributed Nationwide, 50+ Industrial Demonstrations',
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
        title: title || 'Untitled Technology',
        subtitle: subtitle || 'Renewable Energy',
        media: media,
      }
    },
  },
})
