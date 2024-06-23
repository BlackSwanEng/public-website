import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: '27n0auaj',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2022-03-07', // use current date (YYYY-MM-DD) to target the latest API version
})