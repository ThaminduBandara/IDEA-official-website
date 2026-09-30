import { defineType, defineField } from 'sanity';

export const downloadType = defineType({
  name: 'download',
  title: 'Downloads & Resources',
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
          { title: 'Reports', value: 'Reports' },
          { title: 'Guidelines', value: 'Guidelines' },
          { title: 'Forms', value: 'Forms' },
          { title: 'Presentations', value: 'Presentations' },
          { title: 'Other', value: 'Other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Release Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'fileName',
      title: 'File Name (e.g. Report.pdf)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fileSize',
      title: 'File Size (e.g. 3.36 MB)',
      type: 'string',
    }),
    defineField({
      name: 'fileFormat',
      title: 'File Format (PDF, DOCX, ZIP)',
      type: 'string',
      initialValue: 'PDF',
    }),
    defineField({
      name: 'fileAsset',
      title: 'File Upload (PDF/Doc)',
      type: 'file',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External Download URL (Alternative)',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Resource',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
    },
  },
});

export default downloadType;
