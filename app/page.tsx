import HomeClient from '@/app/components/HomeClient'
import { sanityClient } from '@/app/lib/sanity'

export const revalidate = 0

type Tour = {
  _id: string
  title?: string | null
  titleEn?: string | null
  category?: string | null
  priceUsd?: number | null
  showPrice?: boolean | null
  duration?: string | null
  durationEn?: string | null
  description?: string | null
  descriptionEn?: string | null
  includes?: Array<string | null> | null
  includesEn?: Array<string | null> | null
  notIncluded?: Array<string | null> | null
  notIncludedEn?: Array<string | null> | null
  imageUrl?: string | null
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
  photoUrl?: string
}

type RentCar = {
  _id: string
  name?: string
  description?: string
  pricePerDay?: number
  imageUrl?: string
}

type SiteSettings = {
  heroImageUrl?: string
  heroBadgeEs?: string
  heroBadgeEn?: string
  heroTitleEs?: string
  heroTitleEn?: string
  heroSubtitleEs?: string
  heroSubtitleEn?: string
  aboutImageUrl?: string
  aboutBadgeEs?: string
  aboutBadgeEn?: string
  aboutTitleEs?: string
  aboutTitleEn?: string
  aboutDescriptionEs?: string
  aboutDescriptionEn?: string
  aboutHighlightsEs?: string[]
  aboutHighlightsEn?: string[]
  toursTitleEs?: string
  toursTitleEn?: string
  toursSubtitleEs?: string
  toursSubtitleEn?: string
  transfersTitleEs?: string
  transfersTitleEn?: string
  transfersSubtitleEs?: string
  transfersSubtitleEn?: string
  rentTitleEs?: string
  rentTitleEn?: string
  rentSubtitleEs?: string
  rentSubtitleEn?: string
  showFloatingWhatsapp?: boolean
  whatsappNumber?: string
  whatsappLink?: string
  whatsappFloatingTextEs?: string
  whatsappFloatingTextEn?: string
  whatsappDefaultMessageEs?: string
  whatsappDefaultMessageEn?: string
  faqs?: Array<{ questionEs?: string; questionEn?: string; answerEs?: string; answerEn?: string }>
  instagramHandle?: string
  footerDescriptionEs?: string
  footerDescriptionEn?: string
  showPromoVideo?: boolean
  promoVideoUrl?: string
  reviews?: Array<{ clientName?: string; country?: string; rating?: number; commentEs?: string; commentEn?: string }>
  legalPolicies?: {
    privacyPolicyEs?: string
    privacyPolicyEn?: string
    termsConditionsEs?: string
    termsConditionsEn?: string
    cancellationPolicyEs?: string
    cancellationPolicyEn?: string
  }
}

export default async function Home() {
  const query = `{
    "tours": *[_type == "tour"] | order(featured desc, _createdAt desc) {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      title,
      titleEn,
      slug,
      category,
      priceUsd,
      showPrice,
      duration,
      durationEn,
      description,
      descriptionEn,
      image,
      includes,
      includesEn,
      notIncluded,
      notIncludedEn,
      featured,
      "imageUrl": image.asset->url
    },
    "transfers": *[_type == "transferRoute"] | order(featured desc, title asc) {
      _id,
      title,
      airport,
      hotelZone,
      privateRateUsd,
      estimatedTime,
      featured
    },
    "vehicles": *[_type == "vehicle" && category != "rent-car"] {
      _id,
      name,
      category,
      dailyRateUsd,
      passengers,
      luggage,
      photo,
      features,
      available,
      "photoUrl": coalesce(photo.asset->url, image.asset->url),
    },
    "rentCars": *[_type == "rentCar"] | order(_createdAt desc) {
      _id,
      name,
      description,
      pricePerDay,
      "imageUrl": image.asset->url
    },
    "settings": *[_type == "siteSettings"][0] {
      "heroImageUrl": heroImage.asset->url,
      "aboutImageUrl": aboutImage.asset->url,
      heroBadgeEs,
      heroBadgeEn,
      heroTitleEs,
      heroTitleEn,
      heroSubtitleEs,
      heroSubtitleEn,
      aboutBadgeEs,
      aboutBadgeEn,
      aboutTitleEs,
      aboutTitleEn,
      aboutDescriptionEs,
      aboutDescriptionEn,
      aboutHighlightsEs,
      aboutHighlightsEn,
      toursTitleEs,
      toursTitleEn,
      toursSubtitleEs,
      toursSubtitleEn,
      transfersTitleEs,
      transfersTitleEn,
      transfersSubtitleEs,
      transfersSubtitleEn,
      rentTitleEs,
      rentTitleEn,
      rentSubtitleEs,
      rentSubtitleEn,
      showFloatingWhatsapp,
      whatsappNumber,
      whatsappLink,
      whatsappFloatingTextEs,
      whatsappFloatingTextEn,
      whatsappDefaultMessageEs,
      whatsappDefaultMessageEn,
      faqs,
      reviews,
      instagramHandle,
      footerDescriptionEs,
      footerDescriptionEn,
      showPromoVideo,
      promoVideoUrl,
      legalPolicies {
        privacyPolicyEs,
        privacyPolicyEn,
        termsConditionsEs,
        termsConditionsEn,
        cancellationPolicyEs,
        cancellationPolicyEn
      },
    }
  }`

  let tours: Tour[] = []
  let transfers: TransferRoute[] = []
  let vehicles: Vehicle[] = []
  let rentCars: RentCar[] = []
  let settings: SiteSettings | null = null

  try {
    const data = await sanityClient.fetch<{
      tours: Tour[]
      transfers: TransferRoute[]
      vehicles: Vehicle[]
      rentCars: RentCar[]
      settings: SiteSettings | null
    }>(query)

    tours = data.tours ?? []
    transfers = data.transfers ?? []
    vehicles = data.vehicles ?? []
    rentCars = data.rentCars ?? []
    settings = data.settings ?? null
  } catch (error) {
    console.error('Failed to fetch homepage content from Sanity', error)
  }

  return (
    <HomeClient
      tours={tours}
      transfers={transfers}
      vehicles={vehicles}
      rentCars={rentCars}
      settings={settings}
    />
  )
}
