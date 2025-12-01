import { CollectionConfig } from 'payload';

export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'subtitle', 'publishedDate'],
  },
  fields: [
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      label: 'Date Published',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      // Not localized - same publish date across all languages
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
      localized: true, // ✅ Localized
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      label: 'Subtitle',
      localized: true, // ✅ Localized
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Featured Image',
      // Not localized - same image across all languages
      // But you could localize this if you need different images per language
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'News Content',
      localized: true, // ✅ Localized
      admin: {
        // @ts-expect-error
        elements: [
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'blockquote',
          'ul',
          'ol',
          'li',
          'link',
          'relationship',
          'upload',
        ],
        leaves: [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'code',
        ],
      },
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL Slug',
      admin: {
        description: 'Auto-generated from title if left empty',
      },
      hooks: {
        beforeValidate: [
          ({ data, req }) => {
            // Get the current locale from the request
            const locale = req?.locale || 'ro';
            
            // Access the localized title
            const localizedTitle = data?.title?.[locale] || data?.title;
            const localizedSlug = data?.slug?.[locale] || data?.slug;
            
            if (!localizedSlug && localizedTitle) {
              return localizedTitle
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            }
            return localizedSlug;
          },
        ],
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
      // Not localized - status is universal across all languages
    },
  ],
};