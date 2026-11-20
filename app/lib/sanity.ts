import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../../sanity/env'

export { apiVersion, dataset, projectId }

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'published',
})

const imageBuilder = createImageUrlBuilder({ projectId, dataset })

export function getSanityImageUrl(
  image: SanityImageSource | null | undefined,
  width = 1200,
  height = 800,
): string | null {
  if (!image) return null

  try {
    return imageBuilder
      .image(image)
      .width(width)
      .height(height)
      .fit('max')
      .auto('format')
      .url()
  } catch {
    return null
  }
}
