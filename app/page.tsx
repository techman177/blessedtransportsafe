import HomeClient from '@/app/components/HomeClient'
import { sanityClient } from '@/app/lib/sanity'

export const revalidate = 0

type Tour = {
  _id: string
  order?: number
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
  order?: number
  title?: string
  titleEn?: string
  titleIt?: string
  airport?: string
  airportEn?: string
  airportIt?: string
  hotelZone?: string
  hotelZoneEn?: string
  hotelZoneIt?: string
  imageUrl?: string
  privateRateUsd?: number
  estimatedTime?: string
  estimatedTimeEn?: string
  estimatedTimeIt?: string
  featured?: boolean
}

type Vehicle = {
  _id: string
  order?: number
  name?: string
  nameEn?: string
  nameIt?: string
  description?: string
  descriptionEn?: string
  descriptionIt?: string
  category?: string
  dailyRateUsd?: number
  passengers?: number
  luggage?: number
  photo?: unknown
  features?: Array<string | null> | null
  featuresEn?: Array<string | null> | null
  featuresIt?: Array<string | null> | null
  available?: boolean | null
  photoUrl?: string
}

type RentCar = {
  _id: string
  order?: number
  name?: string
  nameEn?: string
  nameIt?: string
  description?: string
  descriptionEn?: string
  descriptionIt?: string
  pricePerDay?: number
  passengers?: number
  luggage?: number
  imageUrl?: string
  galleryUrls?: Array<string | null> | null
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
  aboutDescriptionIt?: string
  safetyTextEs?: string
  safetyTextEn?: string
  safetyTextIt?: string
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
  whatsappFloatingTextIt?: string
  whatsappGreeting?: string
  whatsappGreetingEn?: string
  whatsappGreetingIt?: string
  whatsappDefaultMessageEs?: string
  whatsappDefaultMessageEn?: string
  whatsappDefaultMessageIt?: string
  faqs?: Array<{ questionEs?: string; questionEn?: string; answerEs?: string; answerEn?: string }>
  instagramHandle?: string
  facebookUrl?: string
  email?: string
  phone?: string
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
    "tours": *[_type == "tour"] | order(coalesce(order, 2147483647) asc, _createdAt asc) {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      order,
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
    "transfers": *[_type in ["transferRoute", "airportRoute"]] | order(coalesce(order, 2147483647) asc, _createdAt asc) {
      _id,
      order,
      title,
      titleEn,
      titleIt,
      airport,
      airportEn,
      airportIt,
      hotelZone,
      hotelZoneEn,
      hotelZoneIt,
      "imageUrl": image.asset->url,
      privateRateUsd,
      estimatedTime,
      estimatedTimeEn,
      estimatedTimeIt,
      featured
    },
    "vehicles": *[_type == "vehicle" && category != "rent-car"] | order(coalesce(order, 2147483647) asc, _createdAt asc) {
      _id,
      order,
      name,
      nameEn,
      nameIt,
      description,
      descriptionEn,
      descriptionIt,
      category,
      dailyRateUsd,
      passengers,
      luggage,
      photo,
      features,
      featuresEn,
      featuresIt,
      available,
      "photoUrl": coalesce(photo.asset->url, image.asset->url),
    },
    "rentCars": *[_type == "rentCar"] | order(coalesce(order, 2147483647) asc, _createdAt asc) {
      _id,
      order,
      name,
      nameEn,
      nameIt,
      description,
      descriptionEn,
      descriptionIt,
      pricePerDay,
      passengers,
      luggage,
      "imageUrl": image.asset->url,
      "galleryUrls": gallery[].asset->url
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
      aboutDescriptionIt,
      safetyTextEs,
      safetyTextEn,
      safetyTextIt,
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
      whatsappFloatingTextIt,
      whatsappGreeting,
      whatsappGreetingEn,
      whatsappGreetingIt,
      whatsappDefaultMessageEs,
      whatsappDefaultMessageEn,
      whatsappDefaultMessageIt,
      faqs,
      reviews,
      instagramHandle,
      facebookUrl,
      email,
      phone,
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
