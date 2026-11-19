import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'
import {createClient} from 'next-sanity'

export const projectId = 'my76tbr0'
export const dataset = 'production'
export const apiVersion = '2026-11-18'

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

const imageBuilder = createImageUrlBuilder({projectId, dataset})

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
      .fit('crop')
      .auto('format')
      .url()
  } catch {
    return null
  }
}
