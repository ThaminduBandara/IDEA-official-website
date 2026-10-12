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
      name: 'fileAsset',
      title: 'File Upload (PDF/Doc/Zip)',
      type: 'file',
      description: 'Upload your document here. File name, size, and format will be automatically detected!',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External Download URL (Alternative)',
      type: 'url',
      description: 'Optional alternative if file is hosted elsewhere (e.g. Google Drive, Dropbox)',
    }),
    defineField({
      name: 'fileName',
      title: 'Custom File Name (Optional Override)',
      type: 'string',
      description: 'Leave empty to automatically use the uploaded document’s file name',
    }),
    defineField({
      name: 'fileSize',
      title: 'Custom File Size (Optional Override)',
      type: 'string',
      description: 'Leave empty to automatically calculate file size from the uploaded file',
    }),
    defineField({
      name: 'fileFormat',
      title: 'Custom File Format (Optional Override)',
      type: 'string',
      description: 'Leave empty to automatically detect format (PDF, DOCX, ZIP, etc.)',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Resource',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers display first (e.g. 1, 2, 3...)',
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
