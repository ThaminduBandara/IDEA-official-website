import { defineField, defineType } from 'sanity'
import { reviewStatusField, formatReviewStatusSubtitle } from './reviewStatusField'

export const mobileKitchenAdType = defineType({
  name: 'mobileKitchenAd',
  title: 'Mobile Kitchen Advertisement Spotlight',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      initialValue: 'Mobile Kitchen Commercial Advertisement Spotlight',
      readOnly: true,
    }),

    // --- TOP ADVERTISEMENT HEADER ---
    defineField({
      name: 'badge',
      title: 'Promo Pill Badge',
      type: 'string',
      initialValue: 'Product Spotlight • නවතම ජංගම මුළුතැන්ගෙය',
      description: 'The highlighted glowing badge at the very top of the ad',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'mainHeadline',
      title: 'Commercial Headline',
      type: 'string',
      initialValue: 'The All-New Mobile Kitchen',
      description: 'Main product headline (e.g. The All-New Mobile Kitchen)',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'subHeadline',
      title: 'Ad Sub-headline / Pitch',
      type: 'text',
      rows: 2,
      initialValue:
        'Indoor & Outdoor 2-Burner Clean Biomass Kitchen. Zero smoke, cuts firewood expenses by 50%, and cooks anywhere with portable ease.',
      validation: (Rule) => Rule.required(),
    }),

    // --- COMMERCIAL VIDEO & POSTER ---
    defineField({
      name: 'videoFile',
      title: 'Promo Video File (MP4 / WebM)',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description: 'Upload the vertical/portrait promo video clip (9:16 aspect ratio recommended)',
    }),

    defineField({
      name: 'externalVideoUrl',
      title: 'Or Video URL (Optional)',
      type: 'string',
      description: 'Alternative direct video link or local path (e.g. /videos/idea-documentary.mp4)',
      initialValue: '/videos/idea-documentary.mp4',
    }),

    defineField({
      name: 'posterImage',
      title: 'Video Cover Poster Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional preview poster displayed before the video plays',
    }),

    // --- PRODUCT HIGHLIGHTS & FEATURES ---
    defineField({
      name: 'productBadge',
      title: 'Product Feature Badge',
      type: 'string',
      initialValue: 'Heavy-Duty Double Burner Design',
    }),

    defineField({
      name: 'productTitle',
      title: 'Product Pitch Title',
      type: 'string',
      initialValue: 'Cook Clean, Cook Anywhere',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'productDescription',
      title: 'Product Detailed Copy',
      type: 'text',
      rows: 4,
      initialValue:
        'The IDEA Mobile Kitchen (ජංගම මුළුතැන්ගෙය) combines traditional clay pot cooking with modern thermal efficiency. Engineered with high-retention refractory chambers and a built-in smoke chimney, you can prepare meals indoors without smoke or outdoors in the garden.',
    }),

    // --- 4 SELLING BENEFIT CARDS ---
    defineField({
      name: 'sellingPoints',
      title: 'Key Selling Benefits (4 Cards)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'benefitItem',
          fields: [
            defineField({
              name: 'title',
              title: 'Benefit Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Benefit Description',
              type: 'text',
              rows: 2,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
      initialValue: [
        {
          title: 'Dual Burner Efficiency',
          description: 'Cook two clay pots simultaneously while saving 50%+ on fuelwood expenses.',
        },
        {
          title: 'Smoke-Free Indoors',
          description: 'Flue pipe directs smoke outside, protecting your family’s respiratory health.',
        },
        {
          title: 'Portable & Weatherproof',
          description: 'Easily moved between indoor kitchen, garden, verandah, or small restaurant.',
        },
        {
          title: 'National Delivery',
          description: 'Delivered directly to homes and institutions across all 25 districts in Sri Lanka.',
        },
      ],
    }),

    // --- ORDER & INQUIRY HOTLINE ---
    defineField({
      name: 'hotlineLabel',
      title: 'Hotline Box Label',
      type: 'string',
      initialValue: 'Direct Inquiries & Orders Hotline',
    }),

    defineField({
      name: 'hotlineNumber',
      title: 'Hotline Phone Number',
      type: 'string',
      initialValue: '076 601 3396',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'hotlineSubtext',
      title: 'Hotline Subtext',
      type: 'string',
      initialValue: 'Call or WhatsApp our team for pricing, specifications & islandwide delivery.',
    }),

    defineField({
      name: 'callButtonText',
      title: 'Call Button Text',
      type: 'string',
      initialValue: 'Call Now',
    }),

    defineField({
      name: 'inquireButtonText',
      title: 'Inquire Button Text',
      type: 'string',
      initialValue: 'Inquire Online',
    }),

    // Approval Workflow Field
    reviewStatusField,
  ],

  preview: {
    select: {
      title: 'mainHeadline',
      subtitle: 'hotlineNumber',
      media: 'posterImage',
      reviewStatus: 'reviewStatus',
    },
    prepare({ title, subtitle, media, reviewStatus }) {
      return {
        title: title || 'Mobile Kitchen Ad Spotlight',
        subtitle: formatReviewStatusSubtitle(reviewStatus, `Hotline: ${subtitle || '076 601 3396'}`),
        media: media,
      }
    },
  },
})
