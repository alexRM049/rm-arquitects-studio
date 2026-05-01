import {defineField, defineType} from 'sanity'

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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Residencial', value: 'residencial' },
          { title: 'Comercial', value: 'comercial' },
          { title: 'Oficinas', value: 'oficinas' },
          { title: 'Uso Mixto', value: 'uso-mixto' },
          { title: 'Hospitalidad', value: 'hospitalidad' },
          { title: 'Diseño Interior', value: 'diseno-interior' },
          { title: 'En Construccion', value: 'en-construccion' },
        ],
      },
      description: 'Select the category of the project'
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
            hotspot: true
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
        layout: 'grid'
      }
    })
  ],
})