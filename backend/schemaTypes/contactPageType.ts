import { defineField, defineType } from 'sanity'

export const contactPageType = defineType({
  name: 'contactPage',
  title: 'Contact Page (Header, Info & FAQs)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      initialValue: 'Contact Page Header, Details & FAQs',
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
      initialValue: 'Get in Touch with IDEA',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Hero Subtitle Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Have questions about our sustainable energy projects, eco-village initiatives, or partnership opportunities? Reach out to our Kundasale Head Office team.',
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
          name: 'contactStatCard',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Clock / Response Time (Clock)', value: 'clock' },
                  { title: 'Map Pin / Office Location (MapPin)', value: 'mapPin' },
                  { title: 'Globe / Nationwide Network (Globe)', value: 'globe' },
                  { title: 'Phone / Hotline (Phone)', value: 'phone' },
                  { title: 'Mail / Email (Mail)', value: 'mail' },
                  { title: 'Award / Trust (Award)', value: 'award' },
                ],
              },
              initialValue: 'clock',
            }),
            defineField({
              name: 'title',
              title: 'Card Title / Metric',
              type: 'string',
              description: 'e.g. Fast Response or Central Head Office',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Card Subtitle / Description',
              type: 'string',
              description: 'e.g. Inquiries answered within 24 business hours',
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

    // --- 4 QUICK CONTACT CARDS ---
    defineField({
      name: 'locationAddress',
      title: 'Our Location Address',
      type: 'text',
      rows: 2,
      initialValue: '10-1/11, 3rd Lane, Galmaduwawatte Kundasale, Kandy Sri Lanka 20000',
    }),
    defineField({
      name: 'locationDescription',
      title: 'Location Card Note',
      type: 'text',
      rows: 2,
      initialValue:
        'Visit us at our headquarters in Kandy, where we coordinate our sustainable development initiatives across Sri Lanka.',
    }),

    defineField({
      name: 'phoneNumber',
      title: 'Primary Hotline / Phone',
      type: 'string',
      initialValue: '+94 812 423 396',
    }),
    defineField({
      name: 'phoneDescription',
      title: 'Phone Card Note',
      type: 'text',
      rows: 2,
      initialValue:
        'Call us during office hours for immediate assistance with your inquiries about our programs and services.',
    }),

    defineField({
      name: 'emailAddress',
      title: 'Official Email Address',
      type: 'string',
      initialValue: 'info@idealk.org',
    }),
    defineField({
      name: 'emailDescription',
      title: 'Email Card Note',
      type: 'text',
      rows: 2,
      initialValue:
        "Send us an email and we'll respond as soon as possible with the information you need.",
    }),

    defineField({
      name: 'officeHoursTime',
      title: 'Working Hours Text',
      type: 'string',
      initialValue: 'Monday - Friday: 8:00 AM - 5:00 PM',
    }),
    defineField({
      name: 'officeHoursDescription',
      title: 'Office Hours Card Note',
      type: 'text',
      rows: 2,
      initialValue:
        "We're available during regular business hours. For urgent matters outside these hours, please send us an email.",
    }),

    // --- MAP & VISITOR INFO ---
    defineField({
      name: 'mapGuideText',
      title: 'Landmark & Location Guide Note',
      type: 'text',
      rows: 2,
      initialValue:
        'Located near Galmaduwawatte Junction in Kundasale, just off the main Kandy-Mahiyangana highway. 15 minutes from Kandy city center.',
    }),
    defineField({
      name: 'googleMapsLink',
      title: 'Google Maps External Link',
      type: 'url',
      initialValue: 'https://maps.google.com/?q=Kundasale,Kandy,Sri+Lanka',
    }),
    defineField({
      name: 'officeVisitsText',
      title: 'Office Visits & Consultations Notice',
      type: 'text',
      rows: 3,
      initialValue:
        'Prior appointments are recommended for project consultations, technology demonstrations, or partnership reviews. Please call ahead via +94 81 2420436.',
    }),

    // --- FREQUENTLY ASKED QUESTIONS (FAQS) ---
    defineField({
      name: 'faqTitle',
      title: 'FAQ Section Title',
      type: 'string',
      initialValue: 'Frequently Asked Questions',
    }),
    defineField({
      name: 'faqSubtitle',
      title: 'FAQ Section Subtitle',
      type: 'string',
      initialValue: 'Quick answers to common inquiries about IDEA Sri Lanka operations',
    }),
    defineField({
      name: 'faqs',
      title: 'Frequently Asked Questions List',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer',
            },
          },
        },
      ],
    }),

    // --- CONTACT FORM EMAIL DISPATCH SETTINGS ---
    defineField({
      name: 'web3FormsAccessKey',
      title: 'Web3Forms Access Key',
      type: 'string',
      initialValue: '96ce0667-1aa6-415b-b4e1-14b2598bde18',
      description: 'Your free Access Key from web3forms.com. Inquiries sent via the website contact form will be emailed directly to the inbox linked to this key (e.g. idea.kandy@gmail.com).',
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
        title: title || 'Contact Page Header & Details',
        subtitle: subtitle || 'Office Info, Stats & FAQs',
        media: media,
      }
    },
  },
})

export default contactPageType
