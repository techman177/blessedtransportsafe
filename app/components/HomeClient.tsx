'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { CalendarDays, CarFront, CheckCircle, ChevronDown, ChevronLeft, ChevronRight, Clock3, Mail, MessageCircle, ShieldCheck, Users, X } from 'lucide-react'

export type Tour = {
  _id: string
  order?: number | null
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
  showPromoVideo?: boolean
  promoVideoUrl?: string
}

export type TransferRoute = {
  _id: string
  order?: number | null
  title?: string | null
  titleEn?: string | null
  titleIt?: string | null
  airport?: string | null
  airportEn?: string | null
  airportIt?: string | null
  hotelZone?: string | null
  hotelZoneEn?: string | null
  hotelZoneIt?: string | null
  imageUrl?: string | null
  privateRateUsd?: number | null
  estimatedTime?: string | null
  estimatedTimeEn?: string | null
  estimatedTimeIt?: string | null
  featured?: boolean
}

export type Vehicle = {
  _id: string
  order?: number | null
  name?: string | null
  nameEn?: string | null
  nameIt?: string | null
  description?: string | null
  descriptionEn?: string | null
  descriptionIt?: string | null
  category?: string
  dailyRateUsd?: number | null
  passengers?: number | null
  luggage?: number | null
  photo?: unknown
  photoUrl?: string | null
  imageUrl?: string | null
  image?: unknown
  features?: Array<string | null> | null
  featuresEn?: Array<string | null> | null
  featuresIt?: Array<string | null> | null
  available?: boolean | null
}

export type RentCar = {
  _id: string
  order?: number | null
  name?: string | null
  nameEn?: string | null
  nameIt?: string | null
  description?: string | null
  descriptionEn?: string | null
  descriptionIt?: string | null
  pricePerDay?: number | null
  passengers?: number | null
  luggage?: number | null
  imageUrl?: string | null
  galleryUrls?: Array<string | null> | null
}

export type SiteSettings = {
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
  showPromoVideo?: boolean
  promoVideoUrl?: string
  faqs?: Array<{ questionEs?: string; questionEn?: string; answerEs?: string; answerEn?: string }>
  instagramHandle?: string
  facebookUrl?: string
  email?: string
  phone?: string
  footerDescriptionEs?: string
  footerDescriptionEn?: string
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

type Language = 'es' | 'en' | 'it'

function getLocalizedValue(language: Language, spanish?: string | null, english?: string | null, italian?: string | null) {
  const localizedValue = language === 'es'
    ? spanish || english || italian
    : language === 'it'
      ? italian || english || spanish
      : english || spanish || italian

  return localizedValue?.trim() || undefined
}

function getLocalizedList(language: Language, spanish?: Array<string | null> | null, english?: Array<string | null> | null, italian?: Array<string | null> | null) {
  const localizedList = language === 'es'
    ? spanish || english || italian
    : language === 'it'
      ? italian || english || spanish
      : english || spanish || italian

  return localizedList?.filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
    .map((value) => value.trim()) ?? []
}

const TOUR_CATEGORY_LABELS: Record<string, Record<Language, string>> = {
  'tres-ojos': { es: 'Los Tres Ojos', en: 'Three Eyes', it: 'Los Tres Occhi' },
  'faro-a-colon': { es: 'Faro a Colón', en: 'Columbus Lighthouse', it: 'Faro a Colón' },
  'zona-colonial': { es: 'Zona Colonial', en: 'Colonial Zone', it: 'Zona Coloniale' },
  'city-tour-full-day': { es: 'City Tour Full Day', en: 'Full-Day City Tour', it: 'City Tour di un giorno' },
  'isla-saona': { es: 'Isla Saona', en: 'Saona Island', it: 'Isola Saona' },
  buggies: { es: 'Buggies', en: 'Buggy Adventure', it: 'Buggy' },
  samana: { es: 'Samaná', en: 'Samaná', it: 'Samaná' },
}

const VEHICLE_CATEGORY_LABELS: Record<string, Record<Language, string>> = {
  'van-vip': { es: 'Van / Minibús VIP', en: 'VIP Van / Minibus', it: 'Van / Minibus VIP' },
  suv: { es: 'SUV / Ejecutivo', en: 'SUV / Executive', it: 'SUV / Executive' },
  sedan: { es: 'Sedán privado', en: 'Private Sedan', it: 'Berlina privata' },
}

function normalizeTourLabel(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function getTourCategoryLabel(category: string | null | undefined, title: string, language: Language) {
  if (!category?.trim()) return null

  const categoryKey = category.trim().toLowerCase()
  const localizedLabels = TOUR_CATEGORY_LABELS[categoryKey]
  const label = localizedLabels?.[language] || category.replace(/[-_]+/g, ' ').trim()
  const normalizedTitle = normalizeTourLabel(title)
  const duplicatesTitle = Object.values(localizedLabels || { fallback: label })
    .some((localizedLabel) => normalizedTitle.includes(normalizeTourLabel(localizedLabel)))

  return duplicatesTitle ? null : label
}

const WHATSAPP_PHONE = '18094477101'
const WHATSAPP_ME = `https://wa.me/${WHATSAPP_PHONE}`
const WHATSAPP_LINK = 'https://wa.link/pbnzgo'

function whatsappUrl(message: string) {
  return `${WHATSAPP_ME}?text=${encodeURIComponent(message)}`
}

function normalizeInstagramUrl(value?: string): string {
  const fallback = 'https://www.instagram.com/blessedtransportsafe/'
  const trimmed = value?.trim()
  if (!trimmed) return fallback
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  const handle = trimmed.replace(/^@/, '').replace(/^instagram\.com\//i, '').replace(/^www\.instagram\.com\//i, '').replace(/[/?#].*$/, '').trim()
  return handle ? `https://www.instagram.com/${encodeURIComponent(handle)}/` : fallback
}

function normalizeFacebookUrl(value?: string): string {
  const fallback = 'https://www.facebook.com/BlessedTransportSafe'
  const trimmed = value?.trim()
  if (!trimmed) return fallback
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  const page = trimmed.replace(/^@/, '').replace(/^facebook\.com\//i, '').replace(/^www\.facebook\.com\//i, '').replace(/[/?#].*$/, '').trim()
  return page ? `https://www.facebook.com/${encodeURIComponent(page)}` : fallback
}

function RentCarGallery({ images, title, language }: { images: string[]; title: string; language: Language }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const previous = () => setActiveIndex((index) => (index - 1 + images.length) % images.length)
  const next = () => setActiveIndex((index) => (index + 1) % images.length)

  return (
    <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-t-2xl bg-slate-50">
      {images.length > 0 ? (
        <Image
          src={images[activeIndex]}
          alt={`${title} ${activeIndex + 1}`}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover object-center"
        />
      ) : (
        <div className="grid h-full place-items-center text-slate-300" role="img" aria-label={language === 'es' ? 'Imagen no disponible' : language === 'it' ? 'Immagine non disponibile' : 'Image unavailable'}>
          <CarFront className="h-10 w-10" aria-hidden="true" />
        </div>
      )}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={previous}
            aria-label={language === 'es' ? 'Foto anterior' : language === 'it' ? 'Foto precedente' : 'Previous photo'}
            className="absolute left-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-slate-950/55 text-white transition hover:bg-slate-950/80"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label={language === 'es' ? 'Foto siguiente' : language === 'it' ? 'Foto successiva' : 'Next photo'}
            className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-slate-950/55 text-white transition hover:bg-slate-950/80"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5">
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`${language === 'es' ? 'Foto' : language === 'it' ? 'Foto' : 'Photo'} ${index + 1} ${language === 'es' ? 'de' : language === 'it' ? 'di' : 'of'} ${images.length}`}
                aria-pressed={activeIndex === index}
                className={`h-2 w-2 rounded-full transition ${activeIndex === index ? 'bg-white' : 'bg-white/55 hover:bg-white/80'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function HomeClient({
  tours,
  transfers,
  vehicles,
  rentCars,
  settings,
  initialLanguage,
}: {
  tours: Tour[]
  transfers: TransferRoute[]
  vehicles: Vehicle[]
  rentCars: RentCar[]
  settings: SiteSettings | null
  initialLanguage: 'es' | 'en' | 'it'
}) {
  const [language, setLanguage] = useState<'es' | 'en' | 'it'>(initialLanguage)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [activePolicy, setActivePolicy] = useState<'privacy' | 'terms' | 'cancellation' | null>(null)

  useEffect(() => { document.documentElement.lang = language }, [language])
  useEffect(() => {
    if (!activePolicy) return

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActivePolicy(null)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [activePolicy])

  const es = language === 'es'
  const it = language === 'it'
  const copy = es
    ? { tours: 'Tours', transfers: 'Traslados', fleet: 'Flota', rent: 'Rent Car', about: 'Quiénes Somos', reviews: 'Reseñas', faq: 'Preguntas Frecuentes', book: 'Reservar', heroBadge: settings?.heroBadgeEs || 'Servicio VIP en República Dominicana', heroTitle: settings?.heroTitleEs || 'Traslados VIP y Tours en República Dominicana', heroSubtitle: settings?.heroSubtitleEs || 'Traslados privados, tours exclusivos y vehículos cómodos con atención personalizada las 24 horas.', heroCta: 'Reservar por WhatsApp', toursCta: 'Ver Excursiones', toursTitle: settings?.toursTitleEs || 'Tours y excursiones', toursSubtitle: settings?.toursSubtitleEs || 'Descubre los mejores destinos de República Dominicana.', transfersTitle: settings?.transfersTitleEs || 'Traslados VIP privados', transfersSubtitle: settings?.transfersSubtitleEs || 'Punto a punto con chofer profesional y vehículos climatizados.', rentTitle: settings?.rentTitleEs || 'Rent Car para explorar sin límites', rentSubtitle: settings?.rentSubtitleEs || 'Vehículos disponibles según tu itinerario.', aboutBadge: settings?.aboutBadgeEs || 'Sobre Nosotros', aboutTitle: settings?.aboutTitleEs || 'Experiencias VIP hechas a tu medida', aboutDescription: settings?.aboutDescriptionEs || 'Somos una empresa dominicana especializada en traslados privados, excursiones y rent car.', quote: 'Cotizar por WhatsApp', priceQuote: 'Precio por WhatsApp', faqTitle: 'Preguntas frecuentes', footerDescription: settings?.footerDescriptionEs || 'VIP Transfers, tours y rent car en República Dominicana.' }
    : it
      ? { tours: 'Tour', transfers: 'Transfer', fleet: 'Flotta', rent: 'Noleggio Auto', about: 'Chi siamo', reviews: 'Recensioni', faq: 'Domande frequenti', book: 'Prenota', heroBadge: 'Servizio VIP nella Repubblica Dominicana', heroTitle: 'Il tuo viaggio, sicuro e senza preoccupazioni', heroSubtitle: 'Transfer privati, tour esclusivi e veicoli confortevoli con assistenza personalizzata.', heroCta: 'Prenota su WhatsApp', toursCta: 'Esplora i Tour', toursTitle: 'Tour ed escursioni', toursSubtitle: 'Scopri le migliori destinazioni della Repubblica Dominicana.', transfersTitle: 'Transfer VIP privati', transfersSubtitle: 'Servizio porta a porta con autista professionista.', rentTitle: 'Noleggio auto per esplorare', rentSubtitle: 'Veicoli disponibili per il tuo itinerario.', aboutBadge: 'Chi siamo', aboutTitle: 'Esperienze VIP su misura', aboutDescription: 'Siamo un’azienda dominicana specializzata in transfer privati, escursioni e noleggio auto.', quote: 'Richiedi preventivo', priceQuote: 'Prezzo su WhatsApp', faqTitle: 'Domande frequenti', footerDescription: 'Transfer VIP, tour e noleggio auto nella Repubblica Dominicana.' }
      : { tours: 'Tours', transfers: 'Transfers', fleet: 'Fleet', rent: 'Rent Car', about: 'About Us', reviews: 'Reviews', faq: 'FAQ', book: 'Book Now', heroBadge: settings?.heroBadgeEn || 'VIP service in the Dominican Republic', heroTitle: settings?.heroTitleEn || 'Your trip, safe, comfortable and worry-free', heroSubtitle: settings?.heroSubtitleEn || 'Private transfers, exclusive tours and comfortable vehicles with personalized 24-hour assistance.', heroCta: 'Book on WhatsApp', toursCta: 'Explore Tours', toursTitle: settings?.toursTitleEn || 'Tours & excursions', toursSubtitle: settings?.toursSubtitleEn || 'Discover the best destinations in the Dominican Republic.', transfersTitle: settings?.transfersTitleEn || 'Private VIP transfers', transfersSubtitle: settings?.transfersSubtitleEn || 'Point-to-point service with professional drivers and air-conditioned vehicles.', rentTitle: settings?.rentTitleEn || 'Rent Car for limitless exploration', rentSubtitle: settings?.rentSubtitleEn || 'Vehicles available for your itinerary.', aboutBadge: settings?.aboutBadgeEn || 'About Us', aboutTitle: settings?.aboutTitleEn || 'VIP experiences tailored to you', aboutDescription: settings?.aboutDescriptionEn || 'We are a Dominican company specializing in private transfers, excursions and rent car.', quote: 'Get Quote on WhatsApp', priceQuote: 'Price via WhatsApp', faqTitle: 'Frequently Asked Questions', footerDescription: settings?.footerDescriptionEn || 'VIP Transfers, tours and rent car in the Dominican Republic.' }

  const whatsappNumber = settings?.whatsappNumber || `+1 ${WHATSAPP_PHONE.slice(1,4)}-${WHATSAPP_PHONE.slice(4,7)}-${WHATSAPP_PHONE.slice(7)}`
  const whatsappMe = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`
  const whatsappGreeting = es
    ? settings?.whatsappGreeting?.trim() || '¡Hola Blessed Transport Safe! Gracias por la información, quisiera cotizar un servicio de transporte.'
    : it
      ? settings?.whatsappGreetingIt?.trim() || 'Ciao Blessed Transport Safe! Grazie per le informazioni, vorrei richiedere un preventivo per un servizio di trasporto.'
      : settings?.whatsappGreetingEn?.trim() || 'Hello Blessed Transport Safe! Thank you for the information. I would like to request a quote for a transportation service.'
  const defaultMessage = es
    ? `${whatsappGreeting} ¿Podrían indicarme disponibilidad y precios? Gracias.`
    : it
      ? `${whatsappGreeting} Potreste indicarmi disponibilità e prezzi? Grazie.`
      : `${whatsappGreeting} Could you share availability and prices? Thank you.`
  const floatingText = es
    ? settings?.whatsappFloatingTextEs || '¡Escríbenos!'
    : it
      ? settings?.whatsappFloatingTextIt || 'Scrivici!'
      : settings?.whatsappFloatingTextEn || 'Chat with us!'
  const heroImage = settings?.heroImageUrl || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=88'
  const aboutImage = settings?.aboutImageUrl || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=85'
  const instagramUrl = normalizeInstagramUrl(settings?.instagramHandle)
  const facebookUrl = normalizeFacebookUrl(settings?.facebookUrl)
  const contactEmail = settings?.email?.trim() || 'reservas@blessedtransportsafe.com'
  const contactPhone = settings?.phone?.trim() || '+1 809-447-7101'
  const contactPhoneDigits = contactPhone.replace(/[^0-9]/g, '')
  const contactWhatsappUrl = `https://wa.me/${contactPhoneDigits}`
  const contactTitle = es ? 'Contacto' : it ? 'Contatto' : 'Contact'

  const getWhatsappUrl = (message: string) => `${whatsappMe}?text=${encodeURIComponent(message)}`
  const getServiceWhatsappUrl = (serviceName: string) => {
    const suffix = es
      ? ` Quisiera consultar por ${serviceName}. ¿Podrían compartir disponibilidad y precios? Gracias.`
      : it
        ? ` Vorrei avere informazioni su ${serviceName}. Potreste indicare disponibilità e prezzi? Grazie.`
        : ` I would like information about ${serviceName}. Could you share availability and prices? Thank you.`
    return getWhatsappUrl(`${whatsappGreeting}${suffix}`)
  }

  const fallbackTours: Tour[] = [
    { _id: 'saona', title: 'Excursión Isla Saona', titleEn: 'Saona Island Excursion', category: 'isla-saona', priceUsd: 120, showPrice: true, duration: 'Día completo', durationEn: 'Full day', description: 'Aguas turquesas y playas paradisíacas.', descriptionEn: 'Turquoise waters and paradise beaches.', imageUrl: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=85' },
    { _id: 'colonial', title: 'Zona Colonial', titleEn: 'Colonial Zone', category: 'zona-colonial', priceUsd: 65, showPrice: true, duration: 'Medio día', durationEn: 'Half day', description: 'Historia y arquitectura en Santo Domingo.', descriptionEn: 'History and architecture in Santo Domingo.', imageUrl: 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=1200&q=85' },
    { _id: 'buggies', title: 'Buggies / Aventura', titleEn: 'Buggies / Adventure', category: 'buggies', duration: 'Medio día', durationEn: 'Half day', description: 'Una aventura emocionante por paisajes naturales.', descriptionEn: 'An exciting adventure through natural landscapes.', imageUrl: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=85' },
  ]
  const displayTours = tours.length ? tours : fallbackTours

  const configuredFaqs = settings?.faqs?.map((faq) => ({
    question: (es ? faq.questionEs || faq.questionEn : faq.questionEn || faq.questionEs)?.trim(),
    answer: (es ? faq.answerEs || faq.answerEn : faq.answerEn || faq.answerEs)?.trim(),
  })).filter((faq) => faq.question && faq.answer)
  const faqs = configuredFaqs?.length ? configuredFaqs : es
    ? [{ question: '¿El traslado es 100% privado?', answer: 'Sí. El vehículo es exclusivo para usted y las personas incluidas en su reservación.' }, { question: '¿Qué pasa si mi vuelo se retrasa?', answer: 'Su horario se ajustará según el estado del vuelo cuando esté disponible.' }, { question: '¿Cómo reservo y cómo pago?', answer: 'Reserve por WhatsApp y confirme la disponibilidad y el método de pago acordado.' }, { question: '¿Incluyen sillas para bebés y paradas adicionales?', answer: 'Sí, sujeto a disponibilidad. Indíquenos la edad del menor y las paradas al reservar.' }]
    : [{ question: 'Is the transfer 100% private?', answer: 'Yes. The vehicle is exclusively reserved for you and your group.' }, { question: 'What happens if my flight is delayed?', answer: 'Pickup time is adjusted according to flight status whenever available.' }, { question: 'How do I book and pay?', answer: 'Book through WhatsApp to confirm availability and the agreed payment method.' }, { question: 'Do you provide baby seats and extra stops?', answer: 'Yes, subject to availability. Share the child’s age and requested stops when booking.' }]

  const reviews = settings?.reviews?.length ? settings.reviews : es
    ? [{ clientName: 'María González', country: 'España', rating: 5, commentEs: 'Servicio puntual, amable y muy seguro. El viaje desde el aeropuerto fue perfecto.' }, { clientName: 'James Wilson', country: 'Estados Unidos', rating: 5, commentEs: 'Excelente atención y vehículos muy cómodos. Los recomiendo ampliamente.' }, { clientName: 'Ana Rodríguez', country: 'México', rating: 5, commentEs: 'Un tour organizado impecablemente. Todo estuvo claro y sin contratiempos.' }]
    : [{ clientName: 'María González', country: 'Spain', rating: 5, commentEn: 'Punctual, friendly and very safe service. The airport transfer was perfect.' }, { clientName: 'James Wilson', country: 'United States', rating: 5, commentEn: 'Excellent service and very comfortable vehicles. Highly recommended.' }, { clientName: 'Ana Rodríguez', country: 'Mexico', rating: 5, commentEn: 'An impeccably organized tour. Everything was clear and smooth.' }]

  const configuredAboutHighlights = (es ? settings?.aboutHighlightsEs : settings?.aboutHighlightsEn)?.filter((highlight) => highlight?.trim())
  const aboutHighlights = configuredAboutHighlights?.length
    ? configuredAboutHighlights
    : es
      ? ['Conductores certificados', 'Flota moderna y climatizada', 'Atención personalizada', 'Servicio disponible 24/7']
      : ['Certified drivers', 'Modern air-conditioned fleet', 'Personalized service', '24/7 assistance']

  const privacyFallbackEs = `POLÍTICA DE PRIVACIDAD

Blessed Transport Safe recopila únicamente la información necesaria para gestionar reservas de traslados privados, tours y rent car en República Dominicana.

Los datos que podemos solicitar incluyen nombre, número de teléfono de WhatsApp, cantidad de pasajeros y maletas, origen, destino, fecha y hora del servicio. Cuando el servicio sea un traslado aeroportuario, también podremos recibir datos de vuelo para coordinar el horario de recogida. Estos datos se utilizan exclusivamente para confirmar disponibilidad, comunicarnos con el cliente y prestar el servicio solicitado.

Las conversaciones por WhatsApp se utilizan como canal de reserva y atención al cliente. No comercializamos ni vendemos datos personales ni los usamos con fines publicitarios ajenos a Blessed Transport Safe. Limitamos el acceso a la información a nuestro personal autorizado y la conservamos únicamente durante el tiempo necesario para cumplir obligaciones operativas, fiscales, de seguridad o legales.

El cliente podrá solicitar corrección o eliminación de sus datos mediante el WhatsApp oficial ${WHATSAPP_PHONE}, cuando dicha eliminación no interfiera con obligaciones legales o registros operativos requeridos.

Esta política puede actualizarse para reflejar cambios operativos o legales. La versión vigente estará disponible en esta página web.`

  const termsFallbackEs = `TÉRMINOS Y CONDICIONES

Al solicitar o confirmar una reserva, el pasajero acepta las condiciones operativas de Blessed Transport Safe.

Las reservas se consideran confirmadas únicamente después de recibir la confirmación por WhatsApp. Los precios, horarios, punto de recogida, destino, vehículo y tipo de servicio deben coincidir con la confirmación. La disponibilidad puede cambiar hasta el momento de confirmación.

Para traslados aeroportuarios, el pasajero deberá proporcionar el número de vuelo, aeropuerto, terminal, fecha y hora correctamente. Monitorearemos la llegada cuando sea posible, pero el pasajero es responsable de comunicar cambios urgentes. Normalmente ofrecemos un tiempo de espera razonable sujeto al tipo de reserva y las condiciones reales del aeropuerto.

Los retrasos causados por inmigración, aduanas, pérdida de equipaje o tráfico estarán sujetos a coordinación directa. Las paradas adicionales, sillas para bebés y equipaje especial deben solicitarse antes del servicio y pueden generar cargos o requerir un vehículo distinto.

Blessed Transport Safe no será responsable de pérdidas indirectas, conexiones perdidas, demoras externas o objetos dejados dentro del vehículo. Los pasajeros deberán cuidar su equipaje y notificar inmediatamente cualquier incidencia. Está prohibido transportar objetos peligrosos o ilegales.

El pasajero deberá proporcionar datos reales y seguir las instrucciones del conductor por seguridad y cumplimiento de la ley dominicana.`

  const cancellationFallbackEs = `POLÍTICA DE CANCELACIÓN

Las solicitudes de cancelación o modificación deberán enviarse por WhatsApp al número oficial ${WHATSAPP_PHONE}. La solicitud se considera recibida al confirmar la hora de recepción por nuestro equipo.

Las cancelaciones realizadas con al menos 24 horas de anticipación a la hora confirmada podrán recibir reembolso o crédito, según el método de pago y las condiciones de la reserva. Las cancelaciones realizadas con menos de 24 horas, las reservaciones de última hora y los servicios ya iniciados podrán generar cargos por hasta el 100 % del servicio.

Las modificaciones de fecha, hora, destino, pasajeros o equipaje están sujetas a disponibilidad y podrían modificar el precio. No se garantiza que una solicitud posterior pueda ser atendida sin cargos adicionales.

Las cancelaciones por vuelos cancelados, cambios de aerolínea, clima severo, emergencias o circunstancias fuera de nuestro control se evaluarán caso por caso. Cuando corresponda, ofreceremos reprogramación o reembolso parcial o total según los costos ya incurridos y las condiciones del proveedor.

Los reembolsos aprobados se procesarán al método original de pago o mediante crédito acordado. Los tiempos de devolución podrán variar según la entidad bancaria o plataforma utilizada.

Para confirmar una reserva, el cliente puede solicitar por escrito el desglose de precio, puntos de recogida, políticas de cancelación y condiciones especiales antes de realizar el pago.`

  const privacyFallbackEn = `PRIVACY POLICY

Blessed Transport Safe collects only the information necessary to manage private transfer, tour and rent car bookings in the Dominican Republic.

We may request name, WhatsApp phone number, passenger and luggage count, pickup and destination locations, date and time. For airport transfers, flight details may also be received to coordinate pickup. This information is used exclusively to confirm availability, communicate with the guest and provide the requested service.

WhatsApp conversations serve as our reservation and customer service channel. We do not sell or commercialize personal data or use it for unrelated advertising. Access is limited to authorized personnel, and information is retained only as long as necessary to meet operational, tax, safety or legal obligations.

Guests may request correction or deletion of their data through our official WhatsApp number ${WHATSAPP_PHONE}, when deletion does not conflict with legal or required operational records.

This policy may be updated to reflect operational or legal changes. The current version is available on this website.`

  const termsFallbackEn = `TERMS & CONDITIONS

By requesting or confirming a reservation, the guest accepts the operational conditions of Blessed Transport Safe.

A booking is confirmed only after written confirmation through WhatsApp. Prices, schedules, pickup points, destination, vehicle and service type must match the confirmation. Availability may change until the booking is confirmed.

For airport transfers, the guest must provide the flight number, airport, terminal, date and accurate pickup time. We monitor arrivals when possible, but the guest is responsible for promptly reporting urgent changes. Reasonable waiting time is included only under the terms confirmed for the booking.

Delays caused by immigration, customs, baggage issues or traffic require direct coordination. Extra stops, baby seats and special luggage must be requested before service and may require a different vehicle or additional charges.

Blessed Transport Safe is not responsible for indirect losses, missed connections, external delays or belongings left inside vehicles. Passengers must protect their luggage and report incidents immediately. Dangerous or illegal items are not permitted.

Guests must provide accurate information and follow driver instructions for safety and compliance with Dominican Republic regulations.`

  const cancellationFallbackEn = `CANCELLATION POLICY

Cancellation or modification requests must be sent to our official WhatsApp number ${WHATSAPP_PHONE}. A request is considered received once our team confirms receipt.

Cancellations made at least 24 hours before the confirmed service time may receive a refund or account credit, subject to payment method and reservation conditions. Cancellations made with less than 24 hours’ notice, last-minute bookings and services already in progress may be charged up to 100% of the booking value.

Changes to date, time, destination, passengers or luggage are subject to availability and may change the price. Later requests are not guaranteed to be accepted without additional charges.

Cancellations caused by flight cancellations, airline changes, severe weather, emergencies or circumstances outside our control will be reviewed case by case. Rebooking or partial/full refunds may be offered according to costs already incurred and provider conditions.

Approved refunds will be returned to the original payment method or issued as agreed credit. Processing times may vary depending on banks or payment platforms.

Before payment, guests may request written confirmation of the price, pickup details, cancellation terms and any special conditions.`

  const policyContent = {
    privacy: {
      title: es ? 'Política de Privacidad' : it ? 'Informativa sulla privacy' : 'Privacy Policy',
      body: (es ? settings?.legalPolicies?.privacyPolicyEs : settings?.legalPolicies?.privacyPolicyEn)?.trim()
        || (es ? privacyFallbackEs : privacyFallbackEn),
    },
    terms: {
      title: es ? 'Términos y Condiciones' : it ? 'Termini e condizioni' : 'Terms & Conditions',
      body: (es ? settings?.legalPolicies?.termsConditionsEs : settings?.legalPolicies?.termsConditionsEn)?.trim()
        || (es ? termsFallbackEs : termsFallbackEn),
    },
    cancellation: {
      title: es ? 'Política de Cancelación' : it ? 'Politica di cancellazione' : 'Cancellation Policy',
      body: (es ? settings?.legalPolicies?.cancellationPolicyEs : settings?.legalPolicies?.cancellationPolicyEn)?.trim()
        || (es ? cancellationFallbackEs : cancellationFallbackEn),
    },
  }

  function getPromoVideoEmbedUrl(url?: string) {
    if (!url) return null

    try {
      const parsed = new URL(url)

      if (parsed.hostname.includes('youtu.be')) {
        const videoId = parsed.pathname.slice(1).split('/')[0]
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null
      }

      if (parsed.hostname.includes('youtube.com')) {
        if (parsed.pathname.startsWith('/embed/')) return url
        const videoId = parsed.searchParams.get('v')
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null
      }

      if (parsed.hostname.includes('vimeo.com')) {
        const videoId = parsed.pathname.split('/').filter(Boolean).pop()
        return videoId ? `https://player.vimeo.com/video/${videoId}` : null
      }

      return url
    } catch {
      return null
    }
  }

  const promoVideoEmbedUrl = getPromoVideoEmbedUrl(settings?.promoVideoUrl)

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-800">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-cyan-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="leading-tight"><span className="block text-lg font-extrabold text-cyan-700 sm:text-xl">Blessed <span className="text-amber-500">Transport</span> Safe</span><span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">VIP Transfers &amp; Tours</span></a>
          <nav className="hidden items-center gap-5 md:flex">
            <a className="text-sm font-semibold text-slate-700 hover:text-cyan-700" href="#transfers">{copy.transfers}</a>
            <a className="text-sm font-semibold text-slate-700 hover:text-cyan-700" href="#tours">{copy.tours}</a>
            <a className="text-sm font-semibold text-slate-700 hover:text-cyan-700" href="#fleet">{copy.fleet}</a>
            <a className="text-sm font-semibold text-slate-700 hover:text-cyan-700" href="#rent">{copy.rent}</a>
            <a className="text-sm font-semibold text-slate-700 hover:text-cyan-700" href="#about">{copy.about}</a>
          </nav>
          <div className="hidden items-center gap-3 sm:flex">
            <div className="flex rounded-full border border-cyan-200 bg-cyan-50 p-1" aria-label="Language selector">
              {(['es', 'en', 'it'] as const).map((locale) => (
                <button
                  key={locale}
                  type="button"
                  onClick={() => setLanguage(locale)}
                  className={`rounded-full px-2.5 py-1 text-xs font-bold ${language === locale ? 'bg-cyan-600 text-white' : 'text-cyan-700'}`}
                >
                  {locale.toUpperCase()}
                </button>
              ))}
            </div>
            <a href={getWhatsappUrl(defaultMessage)} target="_blank" rel="noopener noreferrer" className="rounded-full bg-cyan-600 px-5 py-3 text-sm font-bold text-white">{copy.book}</a>
          </div>
          <button type="button" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-100 text-cyan-700 md:hidden">{menuOpen ? '×' : '☰'}</button>
        </div>
        {menuOpen && (
          <nav className="border-t border-cyan-100 bg-white px-5 py-5 md:hidden">
            <div className="flex flex-col gap-4"><a onClick={() => setMenuOpen(false)} href="#transfers">{copy.transfers}</a><a onClick={() => setMenuOpen(false)} href="#tours">{copy.tours}</a><a onClick={() => setMenuOpen(false)} href="#fleet">{copy.fleet}</a><a onClick={() => setMenuOpen(false)} href="#rent">{copy.rent}</a><a onClick={() => setMenuOpen(false)} href="#about">{copy.about}</a><div className="flex gap-2" aria-label="Language selector">{(['es', 'en', 'it'] as const).map((locale) => (<button key={locale} type="button" onClick={() => setLanguage(locale)} className={`rounded-full border px-3 py-2 text-xs font-bold ${language === locale ? 'border-cyan-600 bg-cyan-600 text-white' : 'border-cyan-200 text-cyan-700'}`}>{locale.toUpperCase()}</button>))}</div><a href={getWhatsappUrl(defaultMessage)} target="_blank" rel="noopener noreferrer" className="rounded-full bg-cyan-600 px-5 py-3 text-center text-sm font-bold text-white">{copy.book}</a></div>
          </nav>
        )}
      </header>

      <section id="top" className="relative pt-20">
        <div className="absolute inset-x-5 top-20 mx-auto h-[420px] max-w-7xl overflow-hidden rounded-3xl bg-slate-100 shadow-sm sm:inset-x-8 sm:h-[470px]">
          <Image src={heroImage} alt={copy.heroTitle} fill unoptimized priority sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-cyan-950/34 to-cyan-950/12" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-8 sm:pt-20">
          <div className="max-w-2xl bg-transparent">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-300 [text-shadow:_0_2px_4px_rgb(0_0_0_/_0.8)]">{copy.heroBadge}</p>
            <h1 className="mt-4 text-4xl font-black leading-[1.05] text-cyan-300 [text-shadow:_0_2px_4px_rgb(0_0_0_/_0.8)] sm:text-6xl">{copy.heroTitle}</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-gray-100 [text-shadow:_0_2px_4px_rgb(0_0_0_/_0.8)] sm:text-lg">{copy.heroSubtitle}</p>
            <a href={getWhatsappUrl(defaultMessage)} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex rounded-full bg-emerald-500 px-6 py-3.5 text-sm font-extrabold text-white shadow-sm">
              {copy.heroCta}
            </a>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <a href="#transfers" className="group flex items-center gap-4 rounded-2xl border border-cyan-100 bg-white p-5 shadow-sm">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-cyan-50 text-cyan-700"><Clock3 className="h-5 w-5" /></div>
              <div><h2 className="text-sm font-black text-slate-900">{es ? 'Traslados Aeropuerto' : 'Airport Transfers'}</h2><p className="mt-1 text-xs text-slate-500">{es ? 'Viaja con puntualidad' : 'Travel on time'}</p><span className="mt-2 inline-block text-xs font-bold text-cyan-700">{es ? 'Ver opciones →' : 'View options →'}</span></div>
            </a>
            <a href="#rent" className="group flex items-center gap-4 rounded-2xl border border-cyan-100 bg-white p-5 shadow-sm">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-cyan-50 text-cyan-700"><CarFront className="h-5 w-5" /></div>
              <div><h2 className="text-sm font-black text-slate-900">Rent Car</h2><p className="mt-1 text-xs text-slate-500">{es ? 'Explora a tu ritmo' : 'Explore at your pace'}</p><span className="mt-2 inline-block text-xs font-bold text-cyan-700">{es ? 'Ver opciones →' : 'View options →'}</span></div>
            </a>
            <a href="#tours" className="group flex items-center gap-4 rounded-2xl border border-cyan-100 bg-white p-5 shadow-sm">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-cyan-50 text-cyan-700"><CalendarDays className="h-5 w-5" /></div>
              <div><h2 className="text-sm font-black text-slate-900">{es ? 'Tours y Excursiones' : 'Tours & Excursions'}</h2><p className="mt-1 text-xs text-slate-500">{es ? 'Vive experiencias únicas' : 'Discover unique experiences'}</p><span className="mt-2 inline-block text-xs font-bold text-cyan-700">{es ? 'Ver opciones →' : 'View options →'}</span></div>
            </a>
            <a href="#fleet" className="group flex items-center gap-4 rounded-2xl border border-cyan-100 bg-white p-5 shadow-sm">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-cyan-50 text-cyan-700"><ShieldCheck className="h-5 w-5" /></div>
              <div><h2 className="text-sm font-black text-slate-900">{es ? 'Nuestra Flota' : 'Our Fleet'}</h2><p className="mt-1 text-xs text-slate-500">{es ? 'Confort y seguridad' : 'Comfort and safety'}</p><span className="mt-2 inline-block text-xs font-bold text-cyan-700">{es ? 'Ver opciones →' : 'View options →'}</span></div>
            </a>
          </div>
        </div>
      </section>

      <section id="transfers" className="bg-cyan-50/40 py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-cyan-600">{es ? 'TRASLADOS AEROPORTUARIOS' : it ? 'TRANSFER AEROPORTUALI' : 'AIRPORT TRANSFERS'}</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">{copy.transfersTitle}</h2>
            {copy.transfersSubtitle?.trim() && <p className="mt-3 leading-7 text-slate-600">{copy.transfersSubtitle}</p>}
          </div>

          {transfers.length > 0 ? (
            <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
              {transfers.map((route) => {
                const title = getLocalizedValue(language, route.title, route.titleEn, route.titleIt)
                const airport = getLocalizedValue(language, route.airport, route.airportEn, route.airportIt)
                const destination = getLocalizedValue(language, route.hotelZone, route.hotelZoneEn, route.hotelZoneIt)
                const estimatedTime = getLocalizedValue(language, route.estimatedTime, route.estimatedTimeEn, route.estimatedTimeIt)
                const cardTitle = title || [airport, destination].filter(Boolean).join(' →')
                  || (es ? 'Traslado aeroportuario' : it ? 'Transfer aeroportuale' : 'Airport transfer')
                const priceLabel = typeof route.privateRateUsd === 'number'
                  ? `${es ? 'Desde' : it ? 'Da' : 'From'} USD $${route.privateRateUsd}`
                  : es ? 'Consultar precio' : it ? 'Richiedi un preventivo' : 'Request a quote'
                const quoteDetails = [airport, destination].filter(Boolean).join(' →') || cardTitle

                return (
                  <article key={route._id} className="flex h-full flex-col overflow-hidden rounded-2xl border border-cyan-100 bg-white shadow-sm">
                    <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-t-2xl bg-slate-50">
                      {route.imageUrl ? (
                        <Image src={route.imageUrl} alt={cardTitle} fill unoptimized sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover object-center" />
                      ) : (
                        <div className="grid h-full place-items-center text-slate-300" role="img" aria-label={es ? 'Imagen no disponible' : it ? 'Immagine non disponibile' : 'Image unavailable'}>
                          <CarFront className="h-10 w-10" aria-hidden="true" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-5">
                      <div>
                        <h3 className="line-clamp-2 text-lg font-black text-slate-900">{cardTitle}</h3>
                        {airport && <p className="mt-3 text-sm leading-6 text-slate-600"><span className="font-bold text-slate-700">{es ? 'Aeropuerto' : it ? 'Aeroporto' : 'Airport'}:</span> {airport}</p>}
                        {destination && <p className="mt-1 text-sm leading-6 text-slate-600"><span className="font-bold text-slate-700">{es ? 'Destino' : it ? 'Destinazione' : 'Destination'}:</span> {destination}</p>}
                        {estimatedTime && <p className="mt-2 text-sm font-semibold text-cyan-700">{es ? 'Tiempo estimado' : it ? 'Tempo stimato' : 'Estimated time'}: {estimatedTime}</p>}
                      </div>
                      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                        <p className="text-sm font-bold text-cyan-700">{priceLabel}</p>
                        <a href={getServiceWhatsappUrl(quoteDetails)} target="_blank" rel="noopener noreferrer" className="ml-auto text-sm font-bold text-cyan-700">
                          {es ? 'Reservar →' : it ? 'Prenota →' : 'Book →'}
                        </a>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <p className="rounded-2xl border border-cyan-100 bg-white p-6 text-sm text-slate-600">
              {es ? 'Próximamente publicaremos las rutas disponibles.' : it ? 'Presto pubblicheremo le rotte disponibili.' : 'Available routes will be published soon.'}
            </p>
          )}
        </div>
      </section>

      <section id="tours" className="py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-cyan-600">{es ? 'EXCURSIONES DESTACADAS' : it ? 'ESCURSIONI IN EVIDENZA' : 'FEATURED EXCURSIONS'}</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">{copy.toursTitle}</h2>
            <p className="mt-3 leading-7 text-slate-600">{copy.toursSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayTours.map((tour) => {
              const includedSource = (
                es ? tour.includes : tour.includesEn?.length ? tour.includesEn : tour.includes
              )
              const includedItems = includedSource?.filter(
                (item): item is string => typeof item === 'string' && item.trim().length > 0,
              ).map((item) => item.trim()) ?? []
              const excludedSource = (
                es ? tour.notIncluded : tour.notIncludedEn?.length ? tour.notIncludedEn : tour.notIncluded
              )
              const excludedItems = excludedSource?.filter(
                (item): item is string => typeof item === 'string' && item.trim().length > 0,
              ).map((item) => item.trim()) ?? []
              const includedPreviewItems = includedItems.slice(0, 2)
              const excludedPreviewItems = excludedItems.slice(0, 2)
              const title = (es ? tour.title : tour.titleEn || tour.title)?.trim()
                || (es ? 'Tour y excursión' : it ? 'Tour ed escursione' : 'Tour and excursion')
              const description = (es ? tour.description : tour.descriptionEn || tour.description)?.trim()
              const duration = (es ? tour.duration : tour.durationEn || tour.duration)?.trim()
              const categoryLabel = getTourCategoryLabel(tour.category, title, language)
              const priceLabel = typeof tour.priceUsd === 'number' && tour.showPrice !== false
                ? `${es ? 'Desde' : it ? 'Da' : 'From'} USD $${tour.priceUsd}`
                : es ? 'Consultar precio' : it ? 'Richiedi un preventivo' : 'Request a quote'

              return (
                <article key={tour._id} className="flex h-full flex-col overflow-hidden rounded-2xl border border-cyan-100 bg-white shadow-sm">
                  <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-t-2xl bg-slate-50">
                    {tour.imageUrl ? (
                      <Image src={tour.imageUrl} alt={title} fill unoptimized sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-center" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm font-semibold text-slate-400">{es ? 'Próximamente' : it ? 'Prossimamente' : 'Coming soon'}</div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-4">
                    <div>
                      {categoryLabel && <p className="text-xs font-bold tracking-wide text-cyan-600">{categoryLabel}</p>}
                      <h3 className="mt-1 line-clamp-2 text-lg font-black leading-6 text-slate-900">{title}</h3>
                      {duration && <p className="mt-2 text-sm font-semibold text-cyan-700">{es ? 'Duración' : it ? 'Durata' : 'Duration'}: {duration}</p>}
                      {description && <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{description}</p>}
                      {(includedItems.length > 0 || excludedItems.length > 0) && (
                        <div className="mt-4 space-y-3">
                          {includedItems.length > 0 && (
                            <div>
                              <h4 className="text-sm font-bold text-slate-800">{es ? 'Incluye' : it ? 'Incluso' : 'Includes'}</h4>
                              <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm leading-5 text-slate-600">
                                {includedPreviewItems.map((item, index) => <li key={`included-${index}-${item}`} className="line-clamp-1">{item}</li>)}
                              </ul>
                              {includedItems.length > includedPreviewItems.length && <p className="mt-1 text-xs text-slate-500">+{includedItems.length - includedPreviewItems.length} {es ? 'más' : it ? 'altri' : 'more'}</p>}
                            </div>
                          )}
                          {excludedItems.length > 0 && (
                            <div>
                              <h4 className="text-sm font-bold text-slate-800">{es ? 'No incluye' : it ? 'Non incluso' : 'Not included'}</h4>
                              <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm leading-5 text-slate-600">
                                {excludedPreviewItems.map((item, index) => <li key={`excluded-${index}-${item}`} className="line-clamp-1">{item}</li>)}
                              </ul>
                              {excludedItems.length > excludedPreviewItems.length && <p className="mt-1 text-xs text-slate-500">+{excludedItems.length - excludedPreviewItems.length} {es ? 'más' : it ? 'altri' : 'more'}</p>}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                      <p className="text-sm font-bold text-cyan-700">{priceLabel}</p>
                      <a href={getServiceWhatsappUrl(es ? tour.title || 'Tour' : tour.titleEn || tour.title || 'Tour')} target="_blank" rel="noopener noreferrer" className="ml-auto text-sm font-bold text-cyan-700">{es ? 'Reservar →' : it ? 'Prenota →' : 'Book →'}</a>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {promoVideoEmbedUrl && (
        <section id="promo-video" className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-cyan-100 bg-white shadow-sm">
              <div className="aspect-video w-full">
                <iframe
                  src={promoVideoEmbedUrl}
                  title={es ? 'Video promocional' : 'Promotional video'}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      <section id="fleet" className="bg-cyan-50/40 py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-cyan-600">{es ? 'NUESTRA FLOTA' : it ? 'LA NOSTRA FLOTTA' : 'OUR FLEET'}</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">{es ? 'Vehículos para tus traslados' : it ? 'Veicoli per i tuoi transfer' : 'Vehicles for your transfers'}</h2>
          </div>

          {vehicles.length > 0 ? (
            <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
              {vehicles.map((vehicle) => {
                const title = getLocalizedValue(language, vehicle.name, vehicle.nameEn, vehicle.nameIt)
                const categoryLabel = vehicle.category
                  ? VEHICLE_CATEGORY_LABELS[vehicle.category]?.[language] || vehicle.category.replace(/[-_]+/g, ' ')
                  : undefined
                const cardTitle = title || categoryLabel || (es ? 'Vehículo' : it ? 'Veicolo' : 'Vehicle')
                const description = getLocalizedValue(language, vehicle.description, vehicle.descriptionEn, vehicle.descriptionIt)
                const features = getLocalizedList(language, vehicle.features, vehicle.featuresEn, vehicle.featuresIt).slice(0, 3)
                const imageUrl = vehicle.photoUrl || vehicle.imageUrl
                const priceLabel = typeof vehicle.dailyRateUsd === 'number'
                  ? `${es ? 'Desde' : it ? 'Da' : 'From'} USD $${vehicle.dailyRateUsd}${es ? '/día' : it ? '/giorno' : '/day'}`
                  : es ? 'Consultar precio' : it ? 'Richiedi un preventivo' : 'Request a quote'
                const availabilityLabel = typeof vehicle.available !== 'boolean'
                  ? undefined
                  : vehicle.available
                    ? es ? 'Disponible' : it ? 'Disponibile' : 'Available'
                    : es ? 'No disponible' : it ? 'Non disponibile' : 'Unavailable'

                return (
                  <article key={vehicle._id} className="flex h-full flex-col overflow-hidden rounded-2xl border border-cyan-100 bg-white shadow-sm">
                    <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-t-2xl bg-slate-50">
                      {imageUrl ? (
                        <Image src={imageUrl} alt={cardTitle} fill unoptimized sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover object-center" />
                      ) : (
                        <div className="grid h-full place-items-center text-slate-300" role="img" aria-label={es ? 'Imagen no disponible' : it ? 'Immagine non disponibile' : 'Image unavailable'}>
                          <CarFront className="h-10 w-10" aria-hidden="true" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-5">
                      <div>
                        {categoryLabel && <p className="text-xs font-bold tracking-wide text-cyan-700">{categoryLabel}</p>}
                        <h3 className="mt-1 line-clamp-2 text-lg font-black text-slate-900">{cardTitle}</h3>
                        {description && <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{description}</p>}
                        {(typeof vehicle.passengers === 'number' || typeof vehicle.luggage === 'number' || availabilityLabel) && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {typeof vehicle.passengers === 'number' && <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-slate-700">{vehicle.passengers} {es ? 'pasajeros' : it ? 'passeggeri' : 'passengers'}</span>}
                            {typeof vehicle.luggage === 'number' && <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-slate-700">{vehicle.luggage} {es ? 'maletas' : it ? 'bagagli' : 'bags'}</span>}
                            {availabilityLabel && <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-slate-700">{availabilityLabel}</span>}
                          </div>
                        )}
                        {features.length > 0 && <ul className="mt-3 space-y-1 text-sm text-slate-600">{features.map((feature, index) => <li key={`${feature}-${index}`} className="line-clamp-1">• {feature}</li>)}</ul>}
                      </div>
                      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                        <p className="text-sm font-bold text-cyan-700">{priceLabel}</p>
                        <a href={getServiceWhatsappUrl(cardTitle)} target="_blank" rel="noopener noreferrer" className="ml-auto text-sm font-bold text-cyan-700">
                          {es ? 'Consultar →' : it ? 'Richiedi info →' : 'Inquire →'}
                        </a>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <p className="rounded-2xl border border-cyan-100 bg-white p-6 text-sm text-slate-600">
              {es ? 'Próximamente publicaremos los vehículos disponibles.' : it ? 'Presto pubblicheremo i veicoli disponibili.' : 'Available vehicles will be published soon.'}
            </p>
          )}
        </div>
      </section>

      <section id="rent" className="py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-cyan-600">{es ? 'ALQUILER DE VEHÍCULOS' : it ? 'NOLEGGIO AUTO' : 'CAR RENTAL'}</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">{copy.rentTitle}</h2>
            {copy.rentSubtitle?.trim() && <p className="mt-3 leading-7 text-slate-600">{copy.rentSubtitle}</p>}
          </div>

          {rentCars.length > 0 ? (
            <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rentCars.map((rentCar) => {
                const title = getLocalizedValue(language, rentCar.name, rentCar.nameEn, rentCar.nameIt)
                  || (es ? 'Vehículo de alquiler' : it ? 'Auto a noleggio' : 'Rental vehicle')
                const description = getLocalizedValue(language, rentCar.description, rentCar.descriptionEn, rentCar.descriptionIt)
                const images = [...new Set([rentCar.imageUrl, ...(rentCar.galleryUrls || [])]
                  .filter((image): image is string => typeof image === 'string' && image.trim().length > 0)
                  .map((image) => image.trim()))]
                const priceLabel = typeof rentCar.pricePerDay === 'number'
                  ? `USD $${rentCar.pricePerDay}${es ? '/día' : it ? '/giorno' : '/day'}`
                  : es ? 'Consultar precio' : it ? 'Richiedi un preventivo' : 'Request a quote'

                return (
                  <article key={rentCar._id} className="flex h-full flex-col overflow-hidden rounded-2xl border border-cyan-100 bg-white shadow-sm">
                    <RentCarGallery images={images} title={title} language={language} />
                    <div className="flex flex-1 flex-col justify-between p-5">
                      <div>
                        <h3 className="line-clamp-2 text-lg font-black text-slate-900">{title}</h3>
                        {description && <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{description}</p>}
                        {(typeof rentCar.passengers === 'number' || typeof rentCar.luggage === 'number') && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {typeof rentCar.passengers === 'number' && <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-slate-700">{rentCar.passengers} {es ? 'pasajeros' : it ? 'passeggeri' : 'passengers'}</span>}
                            {typeof rentCar.luggage === 'number' && <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-slate-700">{rentCar.luggage} {es ? 'maletas' : it ? 'bagagli' : 'bags'}</span>}
                          </div>
                        )}
                      </div>
                      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                        <p className="text-sm font-bold text-cyan-700">{priceLabel}</p>
                        <a href={getServiceWhatsappUrl(title)} target="_blank" rel="noopener noreferrer" className="ml-auto text-sm font-bold text-cyan-700">
                          {es ? 'Reservar →' : it ? 'Prenota →' : 'Book →'}
                        </a>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <p className="rounded-2xl border border-cyan-100 bg-white p-6 text-sm text-slate-600">
              {es ? 'Próximamente publicaremos los vehículos de alquiler.' : it ? 'Presto pubblicheremo le auto a noleggio.' : 'Rental vehicles will be published soon.'}
            </p>
          )}
        </div>
      </section>

      <section id="about" className="bg-cyan-50/40 py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-cyan-600">SOBRE NOSOTROS</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-5xl">{copy.about}</h2>
            <p className="mt-4 leading-7 text-slate-600">
              {it
                ? settings?.safetyTextIt || 'Impegnati per la vostra sicurezza e soddisfazione.'
                : es
                  ? settings?.safetyTextEs || 'Comprometidos con su seguridad y satisfacción.'
                  : settings?.safetyTextEn || 'Committed to your safety and satisfaction.'}
            </p>
            {(it ? settings?.aboutDescriptionIt : es ? settings?.aboutDescriptionEs : settings?.aboutDescriptionEn)?.trim() && (
              <p className="mt-3 max-w-2xl whitespace-pre-line text-base leading-7 text-slate-600">
                {it
                  ? settings?.aboutDescriptionIt?.trim()
                  : es
                    ? settings?.aboutDescriptionEs?.trim()
                    : settings?.aboutDescriptionEn?.trim()}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 rounded-2xl border border-cyan-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <ShieldCheck className="h-8 w-8 flex-shrink-0 text-cyan-600" />
                <div className="flex-1">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-cyan-600">{es ? 'Calidad y seguridad' : 'Quality and safety'}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{es ? 'Vehículos revisados y seguros.' : 'Inspected and insured vehicles.'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-cyan-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <Users className="h-8 w-8 flex-shrink-0 text-cyan-600" />
                <div className="flex-1">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-cyan-600">{es ? 'Atención personalizada' : 'Personalized service'}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{es ? 'Choferes profesionales y amables.' : 'Professional and friendly drivers.'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-cyan-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <Clock3 className="h-8 w-8 flex-shrink-0 text-cyan-600" />
                <div className="flex-1">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-cyan-600">{es ? 'Puntualidad garantizada' : 'On-time guarantee'}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{es ? 'Monitoreo de vuelos y tráfico.' : 'Flight and traffic monitoring.'}</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-cyan-100 bg-slate-50 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <Image
                src={aboutImage}
                alt={it ? 'Chi siamo e i nostri servizi di trasporto' : es ? 'Quiénes somos y nuestros servicios de transporte' : 'About us and our transportation services'}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-black text-slate-900">{es ? '¿Por qué elegirnos?' : 'Why choose us?'}</h3>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {aboutHighlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-3 rounded-2xl border border-cyan-100 bg-white p-4 text-sm shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 text-emerald-500" />
                  <p className="font-medium leading-6 text-slate-700">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-cyan-600">INFORMACIÓN ÚTIL</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-5xl">{copy.faq}</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-2xl border border-cyan-100 bg-white p-6 shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <p className="text-sm font-bold text-slate-900">{faq.question}</p>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
                    {openFaq === index ? <X className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="mt-4 text-sm leading-6 text-slate-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-cyan-100 bg-white py-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
            <div className="flex-1">
              <a href="#top" className="flex items-center gap-2 text-slate-900">
                <span className="block text-2xl font-extrabold">Blessed <span className="text-emerald-500">Transport</span> Safe</span>
              </a>
              {(es ? settings?.footerDescriptionEs || settings?.footerDescriptionEn : settings?.footerDescriptionEn || settings?.footerDescriptionEs)?.trim() && <p className="mt-4 text-sm leading-6 text-slate-600">{es ? settings?.footerDescriptionEs || settings?.footerDescriptionEn : settings?.footerDescriptionEn || settings?.footerDescriptionEs}</p>}
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3">
              <a href="#tours" className="text-sm text-slate-500 hover:text-cyan-700">{copy.tours}</a>
              <a href="#transfers" className="text-sm text-slate-500 hover:text-cyan-700">{copy.transfers}</a>
              <a href="#rent" className="text-sm text-slate-500 hover:text-cyan-700">{copy.rent}</a>
              <a href="#about" className="text-sm text-slate-500 hover:text-cyan-700">{copy.about}</a>
              <button type="button" onClick={() => setActivePolicy('privacy')} className="text-left text-sm text-slate-500 hover:text-cyan-700">{policyContent.privacy.title}</button>
              <button type="button" onClick={() => setActivePolicy('terms')} className="text-left text-sm text-slate-500 hover:text-cyan-700">{policyContent.terms.title}</button>
              <div className="col-span-2 flex items-center gap-4 sm:col-span-3" aria-label={es ? 'Redes sociales' : 'Social media'}>
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid h-8 w-8 place-items-center rounded-full transition hover:scale-105">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
                    <circle cx="12" cy="12" r="12" fill="#1877F2" />
                    <path d="M13.35 22v-8.7h2.92l.44-3.39h-3.36V7.67c0-.98.27-1.65 1.68-1.65h1.79V3.02a24 24 0 0 0-2.61-.13c-2.58 0-4.35 1.58-4.35 4.47v2.55H6.92v3.39h2.94V22h3.49Z" fill="#fff" />
                  </svg>
                </a>
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-8 w-8 place-items-center transition hover:scale-105">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
                    <defs>
                      <radialGradient id="instagramGradient" cx="30%" cy="107%" r="120%">
                        <stop offset="0%" stopColor="#FDF497" />
                        <stop offset="45%" stopColor="#FDF497" />
                        <stop offset="60%" stopColor="#FD5949" />
                        <stop offset="90%" stopColor="#D6249F" />
                        <stop offset="100%" stopColor="#285AEB" />
                      </radialGradient>
                    </defs>
                    <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#instagramGradient)" />
                    <circle cx="12" cy="12" r="4.2" fill="none" stroke="#fff" strokeWidth="2" />
                    <circle cx="17.5" cy="6.5" r="1.25" fill="#fff" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="min-w-0 sm:w-64">
              <h3 className="mb-4 text-sm font-bold text-slate-900">{contactTitle}</h3>
              <div className="space-y-3">
                <a href={`mailto:${contactEmail}`} className="flex items-center gap-2 text-sm text-slate-500 transition hover:text-cyan-700">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="break-all">{contactEmail}</span>
                </a>
                <a href={contactWhatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-500 transition hover:text-cyan-700">
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  <span>{contactPhone}</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-cyan-100 pt-8 text-center text-sm text-slate-500">
            <p>© 2026 Blessed Transport Safe. {es ? 'Todos los derechos reservados.' : 'All rights reserved.'}</p>
            <p className="mt-2">{es ? 'Creado por IntegratCore' : 'Created by IntegratCore'}</p>
          </div>
        </div>
      </footer>
      {activePolicy && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-slate-950/60 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) setActivePolicy(null)
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-policy-title"
            className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 id="legal-policy-title" className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                {policyContent[activePolicy].title}
              </h2>
              <button
                type="button"
                onClick={() => setActivePolicy(null)}
                aria-label={es ? 'Cerrar' : it ? 'Chiudi' : 'Close'}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600">
              {policyContent[activePolicy].body}
            </p>
          </section>
        </div>
      )}
      <a
        href={getWhatsappUrl(defaultMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={es ? 'Chatear por WhatsApp' : 'Chat on WhatsApp'}
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-950/25 transition hover:scale-105 hover:bg-emerald-600 motion-reduce:animate-none animate-pulse"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-7 w-7 fill-current"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </main>
  )
}