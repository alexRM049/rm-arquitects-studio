import {defineField, defineType} from 'sanity'

// This 'export' keyword is what fixes the error in index.ts!
export const projectType = defineType({
  name: 'project',
  title: 'Architectural Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    // rm-architects-studio/schemaTypes/project.ts
    defineField({
      name: 'locationCoords',
      title: 'Project Coordinates',
      type: 'geopoint',
      description: 'Find coordinates on Google Maps and paste them here (Lat/Lng)'
    }),
    defineField({
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [
    {
      type: 'image',
      options: {
        hotspot: true // Allows your brother to crop each gallery image perfectly
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility.'
        }
      ]
    }
  ],
  options: {
    layout: 'grid' // This makes the images appear as a nice grid in the dashboard
  }
})
  ],
})