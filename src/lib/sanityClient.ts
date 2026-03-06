import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'drg8ezbe',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})
