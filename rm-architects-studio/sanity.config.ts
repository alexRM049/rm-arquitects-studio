import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {googleMapsInput} from '@sanity/google-maps-input'

export default defineConfig({
  name: 'default',
  title: 'RM Architects Studio',

  projectId: 'bf7wfpdc',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
