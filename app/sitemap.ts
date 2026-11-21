import type { MetadataRoute } from 'next'

import { sanityClient } from '@/app/lib/sanity'

export const revalidate = 3600

const baseUrl = 'https://blessedtransportsafe.com'

type SanitySitemapDocument = {
  _type: 'tour' | 'vehicle' | 'rentCar'
  slug?: string | null
  _updatedAt?: string | null
  _createdAt?: string | null
}

const dynamicPathByType: Record<SanitySitemapDocument['_type'], string> = {
  tour: '/excursiones',
  vehicle: '/flota',
  rentCar: '/rent-car',
}

function toValidDate(document: SanitySitemapDocument): Date | undefined {
  const value = document._updatedAt || document._createdAt
  if (!value) return undefined

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]

  try {
    const documents = await sanityClient.fetch<SanitySitemapDocument[]>(
      `*[
        _type in ["tour", "vehicle", "rentCar"]
        && defined(slug.current)
      ] {
        _type,
        "slug": slug.current,
        _updatedAt,
        _createdAt
      }`,
    )

    for (const document of documents) {
      if (!document.slug) continue

      const entry: MetadataRoute.Sitemap[number] = {
        url: `${baseUrl}${dynamicPathByType[document._type]}/${encodeURIComponent(document.slug)}`,
        priority: 0.7,
      }

      const lastModified = toValidDate(document)
      if (lastModified) entry.lastModified = lastModified

      entries.push(entry)
    }
  } catch (error) {
    console.error('Failed to fetch Sanity documents for sitemap', error)
  }

  return entries
}
