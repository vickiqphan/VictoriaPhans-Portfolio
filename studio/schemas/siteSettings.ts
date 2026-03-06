import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'string',
      description: 'e.g. "Clarity in Complexity."',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      description: 'e.g. "Humanity in scale."',
    }),
    defineField({
      name: 'heroBlurb',
      title: 'Hero Blurb',
      type: 'text',
      description: 'Short line below the tagline',
    }),
    defineField({
      name: 'aboutParagraphs',
      title: 'About Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
    }),
    defineField({
      name: 'contactText',
      title: 'Contact Intro Text',
      type: 'text',
    }),
  ],
})
