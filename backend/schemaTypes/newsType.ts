import { defineType, defineField } from 'sanity';

export const newsType = defineType({
  name: 'news',
  title: 'News & Events',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      },
      initialValue: 'News',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eventDate',
      title: 'Event Date / Deadline (Optional)',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location / Venue',
      type: 'string',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'body',
      title: 'Full Article Content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured / Spotlight Item',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'thumbnail',
    },
  },
});

export default newsType;
