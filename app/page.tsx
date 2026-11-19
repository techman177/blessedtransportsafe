import HomeClient from '@/app/components/HomeClient'
import { sanityClient } from '@/app/lib/sanity'

export const revalidate = 60

type Tour = {
  _id: string
  title?: string
  titleEn?: string
  duration?: string
  durationEn?: string
  description?: string
  descriptionEn?: string
  imageUrl?: string
}

type TransferRoute = {
  _id: string
  title?: string
  airport?: string
  hotelZone?: string
  privateRateUsd?: number
  estimatedTime?: string
  featured?: boolean
}

type Vehicle = {
  _id: string
  name?: string
  category?: string
  dailyRateUsd?: number
  passengers?: number
  luggage?: number
  photo?: unknown
  features?: string[]
  available?: boolean
}

export default async function Home() {
  const query = `{
    "tours": *[_type == "tour"] | order(featured desc, _createdAt desc) {
      _id,
      title,
      titleEn,
      duration,
      durationEn,
      description,
      descriptionEn,
      "imageUrl": image.asset->url
    },
    "transfers": *[_type == "transferRoute"] {
      _id,
      title,
      airport,
      hotelZone,
      privateRateUsd,
      estimatedTime,
      featured
    },
    "vehicles": *[_type == "vehicle"] {
      _id,
      name,
      category,
      dailyRateUsd,
      passengers,
      luggage,
      photo,
      features,
      available
    }
  }`

  let tours: Tour[] = []
  let transfers: TransferRoute[] = []
  let vehicles: Vehicle[] = []

  try {
    const data = await sanityClient.fetch<{
      tours: Tour[]
      transfers: TransferRoute[]
      vehicles: Vehicle[]
    }>(query)

    tours = data.tours ?? []
    transfers = data.transfers ?? []
    vehicles = data.vehicles ?? []
  } catch {
    // The client component provides useful fallbacks if Sanity is unavailable.
  }

  return (
    <HomeClient
      tours={tours}
      transfers={transfers}
      vehicles={vehicles}
    />
  )
}
