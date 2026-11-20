'use client'

import { useEffect, useState } from 'react'
import { CalendarDays, Camera, CarFront, CheckCircle, ChevronDown, Circle, Clock3, ShieldCheck, Users, X } from 'lucide-react'

export type Tour = {
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
  showPromoVideo?: boolean
  promoVideoUrl?: string
}

export type TransferRoute = {
  _id: string
  title?: string
  airport?: string
  hotelZone?: string
  privateRateUsd?: number
  estimatedTime?: string
  featured?: boolean
}

export type Vehicle = {
  _id: string
  name?: string
  category?: string
  dailyRateUsd?: number
  passengers?: number
  luggage?: number
  photo?: unknown
  photoUrl?: string
  imageUrl?: string
  image?: unknown
  features?: string[]
  available?: boolean
}

export type RentCar = {
  _id: string
  name?: string
  description?: string
  pricePerDay?: number
  imageUrl?: string
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
  showPromoVideo?: boolean
  promoVideoUrl?: string
  faqs?: Array<{ questionEs?: string; questionEn?: string; answerEs?: string; answerEn?: string }>
  instagramHandle?: string
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

const TOUR_CATEGORY_LABELS: Record<string, Record<Language, string>> = {
  'tres-ojos': { es: 'Los Tres Ojos', en: 'Three Eyes', it: 'Los Tres Occhi' },
  'faro-a-colon': { es: 'Faro a Colón', en: 'Columbus Lighthouse', it: 'Faro a Colón' },
  'zona-colonial': { es: 'Zona Colonial', en: 'Colonial Zone', it: 'Zona Coloniale' },
  'city-tour-full-day': { es: 'City Tour Full Day', en: 'Full-Day City Tour', it: 'City Tour di un giorno' },
  'isla-saona': { es: 'Isla Saona', en: 'Saona Island', it: 'Isola Saona' },
  buggies: { es: 'Buggies', en: 'Buggy Adventure', it: 'Buggy' },
  samana: { es: 'Samaná', en: 'Samaná', it: 'Samaná' },
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

const copy = {
  es: {
    navTours: 'Excursiones', navTransfers: 'Traslados', navRent: 'Rent Car', book: 'Reservar',
    heroLabel: 'Servicio VIP en República Dominicana', heroTitle: 'Traslados VIP y Tours en República Dominicana',
    heroText: 'Traslados privados, tours exclusivos y vehículos cómodos con atención personalizada las 24 horas.',
    whatsapp: 'Reservar por WhatsApp', seeTours: 'Ver Excursiones', punctual: 'Puntualidad garantizada',
    comfortable: 'Vehículos confortables', support: 'Atención 24/7',
    toursEyebrow: 'Experiencias seleccionadas', toursTitle: 'Tours y excursiones', toursText: 'Descubre los mejores destinos de República Dominicana con transporte privado y servicio personalizado.',
    duration: 'Duración', reserveTour: 'Reservar tour', noTours: 'Próximamente publicaremos nuestras excursiones.',
    transfersEyebrow: 'Traslados privados', transfersTitle: 'Viaja con total tranquilidad', transfersText: 'Punto a punto, con chofer profesional y vehículos climatizados.',
    quote: 'Solicitar cotización', sdq: 'Aeropuerto Internacional de Las Américas', puy: 'Punta Cana', custom: 'Rutas Personalizadas',
    rentEyebrow: 'Mobility & comfort', rentTitle: 'Rent Car para explorar sin límites', rentText: 'SUV, sedanes y vehículos ejecutivos disponibles según tu itinerario.',
    rentButton: 'Consultar disponibilidad', footerText: 'VIP Transfers, tours y rent car en República Dominicana.',
    floating: 'Chatear por WhatsApp', faqEyebrow: 'Información útil', faqTitle: 'Preguntas frecuentes',
    privacy: 'Política de Privacidad', terms: 'Términos y Condiciones', cancellation: 'Política de Cancelación',
    rights: '© 2026 Blessed Transport Safe. Todos los derechos reservados.', credit: 'Creado por IntegratCore', close: 'Cerrar',
  },
  en: {
    navTours: 'Tours', navTransfers: 'Transfers', navRent: 'Rent Car', book: 'Book Now',
    heroLabel: 'VIP service in the Dominican Republic', heroTitle: 'Your trip, safe, comfortable and worry-free',
    heroText: 'Private transfers, exclusive tours and comfortable vehicles with personalized 24-hour assistance.',
    whatsapp: 'Book on WhatsApp', seeTours: 'Explore Tours', punctual: 'Guaranteed punctuality',
    comfortable: 'Comfortable vehicles', support: '24/7 assistance',
    toursEyebrow: 'Handpicked experiences', toursTitle: 'Tours & excursions', toursText: 'Discover the best destinations in the Dominican Republic with private transportation and personalized service.',
    duration: 'Duration', reserveTour: 'Book tour', noTours: 'Our excursions will be available soon.',
    transfersEyebrow: 'Private transfers', transfersTitle: 'Travel with complete peace of mind', transfersText: 'Point-to-point service with professional drivers and air-conditioned vehicles.',
    quote: 'Request a quote', sdq: 'Las Américas Airport', puy: 'Punta Cana', custom: 'Custom Routes',
    rentEyebrow: 'Mobility & comfort', rentTitle: 'Rent Car for limitless exploration', rentText: 'SUVs, sedans and executive vehicles available for your itinerary.',
    rentButton: 'Check availability', footerText: 'VIP Transfers, tours and rent car in the Dominican Republic.',
    floating: 'Chat on WhatsApp', faqEyebrow: 'Useful information', faqTitle: 'Frequently Asked Questions',
    privacy: 'Privacy Policy', terms: 'Terms & Conditions', cancellation: 'Cancellation Policy',
    rights: '© 2026 Blessed Transport Safe. All rights reserved.', credit: 'Creado por IntegratCore', close: 'Close',
  },
} as const

function VehicleImage({ vehicle, name, spanish }: { vehicle: Vehicle; name: string; spanish: boolean }) {
  const [failed, setFailed] = useState(false)
  const source = vehicle.photoUrl || vehicle.imageUrl

  if (!source || failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gray-100 text-center" role="img" aria-label={spanish ? 'Imagen no disponible' : 'Image unavailable'}>
        <CarFront className="h-10 w-10 text-gray-400" aria-hidden="true" />
        <span className="text-sm font-semibold text-gray-500">
          {spanish ? 'Próximamente' : 'Coming soon'}
        </span>
      </div>
    )
  }

  return (
    <img
      src={source}
      alt={name}
      className="absolute inset-0 h-full w-full object-cover"
      onError={() => setFailed(true)}
    />
  )
}

export default function HomeClient({ tours, transfers, vehicles, rentCars, settings }: { tours: Tour[]; transfers: TransferRoute[]; vehicles: Vehicle[]; rentCars: RentCar[]; settings: SiteSettings | null }) {
  const [language, setLanguage] = useState<'es' | 'en' | 'it'>('es')
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [activePolicy, setActivePolicy] = useState<'privacy' | 'terms' | 'cancellation' | null>(null)
  const [origin, setOrigin] = useState('Aeropuerto Las Américas SDQ')
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('')
  const [passengers, setPassengers] = useState('1')
  const [tripType, setTripType] = useState('Solo ida')
  const [luggage, setLuggage] = useState('0')

  useEffect(() => { document.documentElement.lang = language }, [language])

  const es = language === 'es'
  const it = language === 'it'
  const copy = es
    ? { tours: 'Tours', transfers: 'Traslados', fleet: 'Flota', rent: 'Rent Car', about: 'Quiénes Somos', reviews: 'Reseñas', faq: 'Preguntas Frecuentes', book: 'Reservar', heroBadge: settings?.heroBadgeEs || 'Servicio VIP en República Dominicana', heroTitle: settings?.heroTitleEs || 'Traslados VIP y Tours en República Dominicana', heroSubtitle: settings?.heroSubtitleEs || 'Traslados privados, tours exclusivos y vehículos cómodos con atención personalizada las 24 horas.', heroCta: 'Reservar por WhatsApp', toursCta: 'Ver Excursiones', toursTitle: settings?.toursTitleEs || 'Tours y excursiones', toursSubtitle: settings?.toursSubtitleEs || 'Descubre los mejores destinos de República Dominicana.', transfersTitle: settings?.transfersTitleEs || 'Traslados VIP privados', transfersSubtitle: settings?.transfersSubtitleEs || 'Punto a punto con chofer profesional y vehículos climatizados.', rentTitle: settings?.rentTitleEs || 'Rent Car para explorar sin límites', rentSubtitle: settings?.rentSubtitleEs || 'Vehículos disponibles según tu itinerario.', aboutBadge: settings?.aboutBadgeEs || 'Sobre Nosotros', aboutTitle: settings?.aboutTitleEs || 'Experiencias VIP hechas a tu medida', aboutDescription: settings?.aboutDescriptionEs || 'Somos una empresa dominicana especializada en traslados privados, excursiones y rent car.', quote: 'Cotizar por WhatsApp', priceQuote: 'Precio por WhatsApp', faqTitle: 'Preguntas frecuentes', footerDescription: settings?.footerDescriptionEs || 'VIP Transfers, tours y rent car en República Dominicana.' }
    : it
      ? { tours: 'Tour', transfers: 'Transfer', fleet: 'Flotta', rent: 'Noleggio Auto', about: 'Chi siamo', reviews: 'Recensioni', faq: 'Domande frequenti', book: 'Prenota', heroBadge: 'Servizio VIP nella Repubblica Dominicana', heroTitle: 'Il tuo viaggio, sicuro e senza preoccupazioni', heroSubtitle: 'Transfer privati, tour esclusivi e veicoli confortevoli con assistenza personalizzata.', heroCta: 'Prenota su WhatsApp', toursCta: 'Esplora i Tour', toursTitle: 'Tour ed escursioni', toursSubtitle: 'Scopri le migliori destinazioni della Repubblica Dominicana.', transfersTitle: 'Transfer VIP privati', transfersSubtitle: 'Servizio porta a porta con autista professionista.', rentTitle: 'Noleggio auto per esplorare', rentSubtitle: 'Veicoli disponibili per il tuo itinerario.', aboutBadge: 'Chi siamo', aboutTitle: 'Esperienze VIP su misura', aboutDescription: 'Siamo un’azienda dominicana specializzata in transfer privati, escursioni e noleggio auto.', quote: 'Richiedi preventivo', priceQuote: 'Prezzo su WhatsApp', faqTitle: 'Domande frequenti', footerDescription: 'Transfer VIP, tour e noleggio auto nella Repubblica Dominicana.' }
      : { tours: 'Tours', transfers: 'Transfers', fleet: 'Fleet', rent: 'Rent Car', about: 'About Us', reviews: 'Reviews', faq: 'FAQ', book: 'Book Now', heroBadge: settings?.heroBadgeEn || 'VIP service in the Dominican Republic', heroTitle: settings?.heroTitleEn || 'Your trip, safe, comfortable and worry-free', heroSubtitle: settings?.heroSubtitleEn || 'Private transfers, exclusive tours and comfortable vehicles with personalized 24-hour assistance.', heroCta: 'Book on WhatsApp', toursCta: 'Explore Tours', toursTitle: settings?.toursTitleEn || 'Tours & excursions', toursSubtitle: settings?.toursSubtitleEn || 'Discover the best destinations in the Dominican Republic.', transfersTitle: settings?.transfersTitleEn || 'Private VIP transfers', transfersSubtitle: settings?.transfersSubtitleEn || 'Point-to-point service with professional drivers and air-conditioned vehicles.', rentTitle: settings?.rentTitleEn || 'Rent Car for limitless exploration', rentSubtitle: settings?.rentSubtitleEn || 'Vehicles available for your itinerary.', aboutBadge: settings?.aboutBadgeEn || 'About Us', aboutTitle: settings?.aboutTitleEn || 'VIP experiences tailored to you', aboutDescription: settings?.aboutDescriptionEn || 'We are a Dominican company specializing in private transfers, excursions and rent car.', quote: 'Get Quote on WhatsApp', priceQuote: 'Price via WhatsApp', faqTitle: 'Frequently Asked Questions', footerDescription: settings?.footerDescriptionEn || 'VIP Transfers, tours and rent car in the Dominican Republic.' }

  const whatsappNumber = settings?.whatsappNumber || `+1 ${WHATSAPP_PHONE.slice(1,4)}-${WHATSAPP_PHONE.slice(4,7)}-${WHATSAPP_PHONE.slice(7)}`
  const whatsappLink = settings?.whatsappLink || 'https://wa.link/pbnzgo'
  const whatsappMe = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`
  const defaultMessage = es
    ? settings?.whatsappDefaultMessageEs || 'Hola, quiero reservar un servicio VIP.'
    : it
      ? 'Ciao, vorrei prenotare un servizio VIP.'
      : settings?.whatsappDefaultMessageEn || 'Hello, I would like to book a VIP service.'
  const floatingText = es ? settings?.whatsappFloatingTextEs || '¡Escríbenos!' : settings?.whatsappFloatingTextEn || 'Chat with us!'
  const heroImage = settings?.heroImageUrl || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=88'
  const aboutImage = settings?.aboutImageUrl || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=85'
  const instagramHandle = settings?.instagramHandle || '@BlessedTransportSafe'

  const getWhatsappUrl = (message: string) => `${whatsappMe}?text=${encodeURIComponent(message)}`
  const getServiceWhatsappUrl = (serviceName: string) => {
    const prefix = es
      ? 'Hola, me interesa '
      : it
        ? 'Ciao, mi interessa '
        : 'Hello, I am interested in '
    return getWhatsappUrl(`${prefix}${serviceName}`)
  }

  const quoteMessage = es
    ? `Hola, quisiera cotizar un traslado privado.\nOrigen: ${origin}\nDestino: ${destination || 'Por confirmar'}\nFecha: ${date || 'Por confirmar'}\nPasajeros: ${passengers}\nMaletas: ${luggage}\nTipo de viaje: ${tripType}`
    : `Hello, I would like a private transfer quote.\nOrigin: ${origin}\nDestination: ${destination || 'To be confirmed'}\nDate: ${date || 'To be confirmed'}\nPassengers: ${passengers}\nLuggage: ${luggage}\nTrip type: ${tripType}`

  const fallbackTours: Tour[] = [
    { _id: 'saona', title: 'Excursión Isla Saona', titleEn: 'Saona Island Excursion', category: 'isla-saona', priceUsd: 120, showPrice: true, duration: 'Día completo', durationEn: 'Full day', description: 'Aguas turquesas y playas paradisíacas.', descriptionEn: 'Turquoise waters and paradise beaches.', imageUrl: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=85' },
    { _id: 'colonial', title: 'Zona Colonial', titleEn: 'Colonial Zone', category: 'zona-colonial', priceUsd: 65, showPrice: true, duration: 'Medio día', durationEn: 'Half day', description: 'Historia y arquitectura en Santo Domingo.', descriptionEn: 'History and architecture in Santo Domingo.', imageUrl: 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=1200&q=85' },
    { _id: 'buggies', title: 'Buggies / Aventura', titleEn: 'Buggies / Adventure', category: 'buggies', duration: 'Medio día', durationEn: 'Half day', description: 'Una aventura emocionante por paisajes naturales.', descriptionEn: 'An exciting adventure through natural landscapes.', imageUrl: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=85' },
  ]
  const displayTours = tours.length ? tours : fallbackTours
  const displayVehicles = vehicles.length ? vehicles : [
    { _id: 'fallback-van', name: 'Van VIP', category: 'van-vip', passengers: 10, luggage: 10, available: true, features: ['A/C', 'Espacio de equipaje'] },
  ]
  const primaryVehicle = displayVehicles.find((vehicle) => vehicle.category === 'van-vip' || vehicle.name?.toLowerCase().includes('van')) || displayVehicles[0]
  const rentCarImage = rentCars.find((rentCar) => rentCar.imageUrl?.trim())?.imageUrl
    || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=85'
  const displayTransfers = transfers.length
    ? transfers.map((route) => ({
        _id: route._id,
        title: route.title || (route.airport && route.hotelZone ? `${route.airport} → ${route.hotelZone}` : (es ? 'Traslado privado' : 'Private transfer')),
        detail: route.airport && route.hotelZone
          ? `${route.airport} → ${route.hotelZone}`
          : route.estimatedTime || (es ? 'Cotización personalizada' : 'Custom quote'),
        estimatedTime: route.estimatedTime,
        privateRateUsd: route.privateRateUsd,
      }))
    : [
        { _id: 'fallback-sdq', title: es ? 'Aeropuerto Las Américas' : 'Las Américas Airport', detail: 'SDQ → HOTELS', estimatedTime: undefined, privateRateUsd: undefined },
        { _id: 'fallback-puj', title: 'Punta Cana', detail: 'PUJ → PUNTA CANA', estimatedTime: undefined, privateRateUsd: undefined },
        { _id: 'fallback-custom', title: es ? 'Rutas Personalizadas' : 'Custom Routes', detail: es ? 'Tu ruta, tu horario' : 'Your route, your schedule', estimatedTime: undefined, privateRateUsd: undefined },
      ]

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

  const policyContent = es
    ? {
        privacy: ['Política de Privacidad', settings?.legalPolicies?.privacyPolicyEs || privacyFallbackEs],
        terms: ['Términos y Condiciones', settings?.legalPolicies?.termsConditionsEs || termsFallbackEs],
        cancellation: ['Política de Cancelación', settings?.legalPolicies?.cancellationPolicyEs || cancellationFallbackEs],
      }
    : {
        privacy: ['Privacy Policy', settings?.legalPolicies?.privacyPolicyEn || privacyFallbackEn],
        terms: ['Terms & Conditions', settings?.legalPolicies?.termsConditionsEn || termsFallbackEn],
        cancellation: ['Cancellation Policy', settings?.legalPolicies?.cancellationPolicyEn || cancellationFallbackEn],
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
        <div
          className="absolute inset-x-0 top-20 h-[420px] bg-cover bg-center sm:h-[470px]"
          style={{ backgroundImage: `linear-gradient(90deg,rgba(255,255,255,.94),rgba(255,255,255,.78) 58%,rgba(207,250,254,.35)),url('${heroImage}')` }}
        />
        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-8 sm:pt-20">
          <div className="max-w-2xl rounded-3xl border border-white/80 bg-white/85 p-6 shadow-xl shadow-cyan-950/5 backdrop-blur-sm sm:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-700">{copy.heroBadge}</p>
            <h1 className="mt-4 text-4xl font-black leading-[1.05] text-slate-900 sm:text-6xl">{copy.heroTitle}</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">{copy.heroSubtitle}</p>
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
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-cyan-600">{es ? 'LOS MÁS SOLICITADOS' : 'MOST REQUESTED'}</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">{copy.transfersTitle}</h2>
            <p className="mt-3 leading-7 text-slate-600">{copy.transfersSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {displayTransfers.slice(0, 3).map((card) => (
              <article key={card._id} className="flex min-h-56 min-w-0 flex-col gap-3 rounded-2xl border border-cyan-100 bg-white p-6 shadow-sm">
                <p className="break-words text-xs font-extrabold uppercase tracking-wider text-cyan-600">{card.detail || (es ? 'Ruta personalizada' : 'Custom route')}</p>
                <h3 className="mt-1 break-words text-xl font-black leading-7 text-slate-900">{card.title || (es ? 'Traslado privado' : 'Private transfer')}</h3>
                {card.estimatedTime?.trim() && <p className="text-sm leading-6 text-slate-600">{card.estimatedTime}</p>}
                <p className="mt-1 text-sm font-bold text-cyan-700">
                  {typeof card.privateRateUsd === 'number' ? `Desde USD $${card.privateRateUsd}` : (es ? 'Consultar precio' : 'Request a quote')}
                </p>
                <a href={getServiceWhatsappUrl(card.title || (es ? 'Traslado privado' : 'Private transfer'))} target="_blank" rel="noopener noreferrer" className="mt-auto pt-3 text-sm font-bold text-cyan-700">
                  {es ? 'Reservar traslado →' : it ? 'Prenota transfer →' : 'Book transfer →'}
                </a>
              </article>
            ))}
          </div>

          <div className="mt-7 flex justify-center">
            <a href={getWhatsappUrl(quoteMessage)} target="_blank" rel="noopener noreferrer" className="rounded-full bg-cyan-700 px-7 py-3.5 text-sm font-extrabold text-white shadow-sm">
              {copy.quote}
            </a>
          </div>
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
                  <div className="relative h-48 w-full shrink-0 overflow-hidden bg-slate-100">
                    {tour.imageUrl ? (
                      <img src={tour.imageUrl} alt={title} className="h-full w-full shrink-0 object-cover" />
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
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-cyan-600">{es ? 'CONFIANZA Y SEGURIDAD' : 'TRUST & SAFETY'}</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">{es ? 'Tu traslado seguro en nuestra flota moderna' : 'Your safe transfer in our modern fleet'}</h2>
          </div>

          {primaryVehicle && (
            <div className="grid overflow-hidden rounded-3xl border border-cyan-100 bg-white shadow-sm lg:grid-cols-[1.15fr_.85fr]">
              <div className="relative min-h-72">
                <VehicleImage vehicle={primaryVehicle} name={primaryVehicle.name || 'Van VIP'} spanish={es} />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10">
                <p className="text-xs font-extrabold uppercase tracking-wider text-cyan-600">Van / Minibus VIP</p>
                <h3 className="mt-3 text-3xl font-black text-slate-900">{primaryVehicle.name || 'Van VIP'}</h3>
                <p className="mt-4 leading-7 text-slate-600">{es ? 'Vehículo climatizado, cómodo y preparado para traslados privados con equipaje y atención personalizada.' : 'Air-conditioned, comfortable vehicle prepared for private transfers with luggage and personalized service.'}</p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-cyan-50 p-4"><Users className="h-5 w-5 text-cyan-700" /><p className="mt-2 text-sm font-bold text-slate-800">{primaryVehicle.passengers || 10} {es ? 'pasajeros' : 'passengers'}</p></div>
                  <div className="rounded-2xl bg-cyan-50 p-4"><ShieldCheck className="h-5 w-5 text-cyan-700" /><p className="mt-2 text-sm font-bold text-slate-800">{es ? 'Viaje seguro' : 'Safe travel'}</p></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="rent" className="py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-cyan-600">RENT CAR</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">{copy.rentTitle}</h2>
            <p className="mt-3 leading-7 text-slate-600">{copy.rentSubtitle}</p>
          </div>

          <div className="grid overflow-hidden rounded-3xl border border-cyan-100 bg-white shadow-sm lg:grid-cols-[1.1fr_.9fr]">
            <div className="relative min-h-64 bg-slate-100 sm:min-h-80">
              <div
                role="img"
                aria-label={es ? 'Servicio de alquiler de vehículos' : 'Car rental service'}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `linear-gradient(0deg,rgba(15,23,42,.16),rgba(15,23,42,.02)),url('${rentCarImage}')` }}
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-5 p-6 sm:p-10 lg:p-12">
              <CarFront className="h-10 w-10 text-cyan-700" aria-hidden="true" />
              <h3 className="text-2xl font-black text-slate-900 sm:text-3xl">{es ? 'Vehículos para cada viaje' : 'The right vehicle for every trip'}</h3>
              <p className="max-w-xl leading-7 text-slate-600">{copy.rentSubtitle?.trim() || (es ? 'Consulta nuestra disponibilidad de vehículos y encuentra la opción ideal para recorrer República Dominicana.' : 'Ask about our available vehicles and find the right option for exploring the Dominican Republic.')}</p>
              <a href={getServiceWhatsappUrl(es ? 'vehículos disponibles para alquiler' : 'available rental vehicles')} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full bg-cyan-700 px-6 py-3.5 text-center text-sm font-bold text-white shadow-sm hover:bg-cyan-800">
                {es ? 'Consultar Vehículos disponibles' : 'Ask about available vehicles'}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-cyan-50/40 py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-cyan-600">SOBRE NOSOTROS</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-5xl">{copy.about}</h2>
            <p className="mt-4 leading-7 text-slate-600">{es ? 'Comprometidos con su seguridad y satisfacción.' : 'Committed to your safety and satisfaction.'}</p>
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
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-cyan-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <img src={aboutImage} alt="Sobre nosotros" className="absolute inset-0 h-full w-full object-cover" />
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
              <a href="#" className="text-sm text-slate-500 hover:text-cyan-700">{es ? 'Política de Privacidad' : 'Privacy Policy'}</a>
              <a href="#" className="text-sm text-slate-500 hover:text-cyan-700">{es ? 'Términos y Condiciones' : 'Terms & Conditions'}</a>
              <div className="col-span-2 flex items-center gap-4 sm:col-span-3" aria-label={es ? 'Redes sociales' : 'Social media'}>
                <a href="#" aria-label="Facebook" className="text-slate-500 transition hover:text-cyan-700">
                  <span className="relative grid h-5 w-5 place-items-center"><Circle className="absolute h-5 w-5" /><span className="text-xs font-bold">f</span></span>
                </a>
                <a href="#" aria-label="Instagram" className="text-slate-500 transition hover:text-cyan-700"><Camera className="h-5 w-5" /></a>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-cyan-100 pt-8 text-center text-sm text-slate-500">
            <p>© 2026 Blessed Transport Safe. {es ? 'Todos los derechos reservados.' : 'All rights reserved.'}</p>
            <p className="mt-2">{es ? 'Creado por IntegratCore' : 'Created by IntegratCore'}</p>
          </div>
        </div>
      </footer>
      <a
        href={whatsappLink || getWhatsappUrl(defaultMessage)}
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