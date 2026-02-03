import { createClient } from '@sanity/client'
import imageBuilder from '@sanity/image-url'

const client = createClient({
  projectId: '8r65v0t1', // 👈 ADD THIS
  dataset: 'production',
  useCdn: true,
  apiVersion: '2021-10-21',
})

const builder = imageBuilder(client)

export const urlFor = (source) =>
  source ? builder.image(source) : { url: () => '' }
export default client
