import { defineType, defineField } from 'sanity';

export const contactType = defineType({
  name: 'contactSubmission',
  title: 'Contact Form Submissions',
  type: 'document',
  fields: [
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'subject',
      title: 'Subject / Category',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Message Content',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted Timestamp',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New Inquiry', value: 'New' },
          { title: 'In Progress', value: 'In Progress' },
          { title: 'Resolved / Replied', value: 'Resolved' },
        ],
      },
      initialValue: 'New',
    }),
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'subject',
    },
  },
});

export default contactType;
