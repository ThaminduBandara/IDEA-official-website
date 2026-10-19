import { defineField, defineType } from 'sanity'
import { reviewStatusField, formatReviewStatusSubtitle } from './reviewStatusField'

export const galleryItemType = defineType({
  name: 'galleryItem',
  title: 'Gallery Album / Story (Photos & Videos)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title / Event Name',
      type: 'string',
      description: 'e.g. Anagi Clean Cookstove Artisan Training Workshop',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Clean Cooking & Stoves', value: 'Clean Cooking & Stoves' },
          { title: 'Renewable Energy & Biochar', value: 'Renewable Energy & Biochar' },
          { title: 'Artisan & Vocational Training', value: 'Artisan & Vocational Training' },
          { title: 'Eco-Villages & Community', value: 'Eco-Villages & Community' },
          { title: 'Documentaries & Video Stories', value: 'Documentaries & Videos' },
          { title: 'Historical Archives (1990 - Present)', value: 'Historical Archives' },
        ],
      },
      initialValue: 'Clean Cooking & Stoves',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'district',
      title: 'District / Location',
      type: 'string',
      description: 'e.g. Kandy, Kurunegala, Hambantota, Matara, Badulla',
      initialValue: 'Kandy',
    }),

    defineField({
      name: 'year',
      title: 'Year / Period',
      type: 'string',
      description: 'e.g. 2026, 2025, or 1995',
      initialValue: '2026',
    }),

    defineField({
      name: 'caption',
      title: 'General Description / Summary',
      type: 'text',
      rows: 3,
      description: 'Brief overview of this field event or technology showcase.',
    }),

    defineField({
      name: 'image',
      title: 'Card Cover Photo (Optional if Video Added)',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional. If left empty, the video itself (or YouTube cover) will automatically be used as the cover.',
    }),

    // --- MULTIPLE IMAGES & VIDEOS IN THIS ALBUM / CARD ---
    defineField({
      name: 'mediaItems',
      title: 'Album Media Collection (Photos & Videos)',
      type: 'array',
      description:
        'Add one or several photos and videos to this card. When clicked, all items will display in a horizontal strip at the bottom and enlarge above.',
      of: [
        {
          type: 'image',
          name: 'photoItem',
          title: '📷 Photograph',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'caption',
              title: 'Photo Caption',
              type: 'string',
              description: 'Optional caption describing this specific photo',
            }),
          ],
        },
        {
          type: 'object',
          name: 'videoItem',
          title: '🎥 Video (Upload File or Link)',
          fields: [
            defineField({
              name: 'videoFile',
              title: 'Upload Video File (MP4, MOV, WebM)',
              type: 'file',
              options: {
                accept: 'video/*',
              },
              description: 'Directly upload a video file from your computer (MP4, WebM, MOV)',
            }),
            defineField({
              name: 'videoUrl',
              title: 'Or Video URL (YouTube, Vimeo)',
              type: 'url',
              description: 'Optional if you uploaded a video file above, or paste a YouTube / Vimeo link',
            }),
            defineField({
              name: 'thumbnail',
              title: 'Video Cover Thumbnail (Optional)',
              type: 'image',
              options: { hotspot: true },
              description: 'Optional. Leave empty to automatically use the video itself (or YouTube cover) as the thumbnail.',
            }),
            defineField({
              name: 'duration',
              title: 'Duration (e.g. 05:30)',
              type: 'string',
            }),
            defineField({
              name: 'caption',
              title: 'Video Caption / Notes',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              url: 'videoUrl',
              media: 'thumbnail',
              duration: 'duration',
              caption: 'caption',
              hasFile: 'videoFile.asset._ref',
            },
            prepare({ url, media, duration, caption, hasFile }) {
              return {
                title: `🎥 Video ${duration ? `[${duration}]` : ''}`,
                subtitle: caption || (hasFile ? 'Uploaded Video File' : url || 'Video Item'),
                media: media,
              }
            },
          },
        },
      ],
    }),

    // Fallback single video fields (backwards-compatible)
    defineField({
      name: 'videoFile',
      title: 'Cover Video File (Upload MP4 / MOV)',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description: 'Optional uploaded video file for this card',
    }),

    defineField({
      name: 'videoUrl',
      title: 'Or Cover Video Link (Optional)',
      type: 'url',
      description: 'Optional video link (YouTube/Vimeo) if this card is primarily a video',
    }),

    defineField({
      name: 'videoDuration',
      title: 'Cover Video Duration',
      type: 'string',
      description: 'e.g. 07:45',
    }),

    defineField({
      name: 'isFeatured',
      title: 'Featured Album',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 10,
    }),

    // Workflow Review Field
    reviewStatusField,
  ],

  preview: {
    select: {
      title: 'title',
      media: 'image',
      category: 'category',
      district: 'district',
      year: 'year',
      reviewStatus: 'reviewStatus',
      mediaItems: 'mediaItems',
    },
    prepare({ title, media, category, district, year, reviewStatus, mediaItems }) {
      const count = Array.isArray(mediaItems) ? mediaItems.length : 1
      const meta = [category, district, year, `${count} item(s)`].filter(Boolean).join(' • ')
      return {
        title: title || 'Untitled Album',
        subtitle: formatReviewStatusSubtitle(reviewStatus, meta),
        media: media,
      }
    },
  },
})
