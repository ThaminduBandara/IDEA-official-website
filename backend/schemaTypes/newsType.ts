import { defineType, defineField } from 'sanity';

export const newsType = defineType({
  name: 'news',
  title: 'News & Events Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Article / Event Title',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Community Development', value: 'Community Development' },
          { title: 'Events & Workshops', value: 'Events & Workshops' },
          { title: 'Climate Action', value: 'Climate Action' },
          { title: 'Environmental Conservation', value: 'Environmental Conservation' },
          { title: 'Sustainable Development', value: 'Sustainable Development' },
        ],
      },
      initialValue: 'Community Development',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'postType',
      title: 'Post Type',
      type: 'string',
      options: {
        list: [
          { title: 'News', value: 'News' },
          { title: 'Event', value: 'Event' },
          { title: 'Workshop', value: 'Workshop' },
          { title: 'Job Vacancy', value: 'Job Vacancy' },
        ],
        layout: 'radio',
      },
      initialValue: 'News',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'string',
      description: 'e.g. 9/16/2026 or Sep 16, 2026',
      initialValue: new Date().toLocaleDateString('en-US'),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location / Venue (Optional)',
      type: 'string',
      description: 'e.g. Kundasale Workshop, Kandy or Kithalagama, Thihagoda',
    }),
    defineField({
      name: 'image',
      title: 'Featured Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Excerpt / Summary',
      type: 'text',
      rows: 3,
      description: 'Short 2-3 sentence summary shown on news cards',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Full Article Content (HTML / Text)',
      type: 'text',
      rows: 10,
      description: 'Full story paragraphs. Standard text or basic HTML like <p>, <ul>, <li>, <strong> are supported.',
    }),
    defineField({
      name: 'featured',
      title: 'Spotlight / Hero Featured Item?',
      type: 'boolean',
      initialValue: false,
      description: 'Toggle ON to feature this item at the very top spotlight card on the News page',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (e.g. 1, 2, 3)',
      initialValue: 10,
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
        title: title || 'Untitled News Item',
        subtitle: subtitle || 'News & Events',
        media: media,
      };
    },
  },
});

export default newsType;
