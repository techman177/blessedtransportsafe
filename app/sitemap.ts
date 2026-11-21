import type { MetadataRoute } from 'next'

import { sanityClient } from '@/app/lib/sanity'

export const revalidate = 3600

const baseUrl = 'https://blessedtransportsafe.com'

type SanitySitemapDocument = {
  _updatedAt?: string | null
}

function toValidDate(value?: string | null): Date | undefined {
  if (!value) return undefined

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const homeEntry: MetadataRoute.Sitemap[number] = {
    url: baseUrl,
    changeFrequency: 'weekly',
    priority: 1,
  }

  try {
    const latestDocument = await sanityClient.fetch<SanitySitemapDocument | null>(
      `*[_type in ["tour", "transferRoute", "airportRoute", "vehicle", "rentCar"]]
        | order(_updatedAt desc)[0] { _updatedAt }`,
    )

    const lastModified = toValidDate(latestDocument?._updatedAt)
    if (lastModified) homeEntry.lastModified = lastModified
  } catch (error) {
    console.error('Failed to fetch Sanity documents for sitemap', error)
  }

  return [homeEntry]
}
