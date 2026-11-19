'use client'

import { useEffect, useState } from 'react'
import { CalendarDays, CarFront, Clock3, Menu, ShieldCheck, Users, X } from 'lucide-react'

export type Tour = {
  _id: string
  title?: string
  titleEn?: string
  category?: string
  priceUsd?: number
  showPrice?: boolean
  duration?: string
  durationEn?: string
  description?: string
  descriptionEn?: string
  imageUrl?: string
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
  features?: string[]
  available?: boolean
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

const WHATSAPP_ME = 'https://wa.me/18094477101'
const WHATSAPP_LINK = 'https://wa.link/pbnzgo'

function whatsappUrl(message: string) {
  return `${WHATSAPP_ME}?text=${encodeURIComponent(message)}`
}

const copy = {
  es: {
    navTours: 'Excursiones', navTransfers: 'Traslados', navRent: 'Rent Car', book: 'Reservar',
    heroLabel: 'Servicio VIP en República Dominicana', heroTitle: 'Tu viaje seguro, cómodo y sin preocupaciones',
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

export default function HomeClient({ tours, transfers, vehicles, settings }: { tours: Tour[]; transfers: TransferRoute[]; vehicles: Vehicle[]; settings: SiteSettings | null }) {
  const [language, setLanguage] = useState<'es' | 'en'>('es')
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
  const copy = es
    ? { tours: 'Tours', transfers: 'Traslados', fleet: 'Flota', rent: 'Rent Car', about: 'Quiénes Somos', reviews: 'Reseñas', faq: 'Preguntas Frecuentes', book: 'Reservar', heroBadge: settings?.heroBadgeEs || 'Servicio VIP en República Dominicana', heroTitle: settings?.heroTitleEs || 'Tu viaje seguro, cómodo y sin preocupaciones', heroSubtitle: settings?.heroSubtitleEs || 'Traslados privados, tours exclusivos y vehículos cómodos con atención personalizada las 24 horas.', heroCta: 'Reservar por WhatsApp', toursCta: 'Ver Excursiones', toursTitle: settings?.toursTitleEs || 'Tours y excursiones', toursSubtitle: settings?.toursSubtitleEs || 'Descubre los mejores destinos de República Dominicana.', transfersTitle: settings?.transfersTitleEs || 'Traslados VIP privados', transfersSubtitle: settings?.transfersSubtitleEs || 'Punto a punto con chofer profesional y vehículos climatizados.', rentTitle: settings?.rentTitleEs || 'Rent Car para explorar sin límites', rentSubtitle: settings?.rentSubtitleEs || 'Vehículos disponibles según tu itinerario.', aboutBadge: settings?.aboutBadgeEs || 'Sobre Nosotros', aboutTitle: settings?.aboutTitleEs || 'Experiencias VIP hechas a tu medida', aboutDescription: settings?.aboutDescriptionEs || 'Somos una empresa dominicana especializada en traslados privados, excursiones y rent car.', quote: 'Cotizar por WhatsApp', priceQuote: 'Precio por WhatsApp', faqTitle: 'Preguntas frecuentes', footerDescription: settings?.footerDescriptionEs || 'VIP Transfers, tours y rent car en República Dominicana.' }
    : { tours: 'Tours', transfers: 'Transfers', fleet: 'Fleet', rent: 'Rent Car', about: 'About Us', reviews: 'Reviews', faq: 'FAQ', book: 'Book Now', heroBadge: settings?.heroBadgeEn || 'VIP service in the Dominican Republic', heroTitle: settings?.heroTitleEn || 'Your trip, safe, comfortable and worry-free', heroSubtitle: settings?.heroSubtitleEn || 'Private transfers, exclusive tours and comfortable vehicles with personalized 24-hour assistance.', heroCta: 'Book on WhatsApp', toursCta: 'Explore Tours', toursTitle: settings?.toursTitleEn || 'Tours & excursions', toursSubtitle: settings?.toursSubtitleEn || 'Discover the best destinations in the Dominican Republic.', transfersTitle: settings?.transfersTitleEn || 'Private VIP transfers', transfersSubtitle: settings?.transfersSubtitleEn || 'Point-to-point service with professional drivers and air-conditioned vehicles.', rentTitle: settings?.rentTitleEn || 'Rent Car for limitless exploration', rentSubtitle: settings?.rentSubtitleEn || 'Vehicles available for your itinerary.', aboutBadge: settings?.aboutBadgeEn || 'About Us', aboutTitle: settings?.aboutTitleEn || 'VIP experiences tailored to you', aboutDescription: settings?.aboutDescriptionEn || 'We are a Dominican company specializing in private transfers, excursions and rent car.', quote: 'Get Quote on WhatsApp', priceQuote: 'Price via WhatsApp', faqTitle: 'Frequently Asked Questions', footerDescription: settings?.footerDescriptionEn || 'VIP Transfers, tours and rent car in the Dominican Republic.' }

  const whatsappNumber = settings?.whatsappNumber || '+1 809-447-7101'
  const whatsappLink = settings?.whatsappLink || 'https://wa.link/pbnzgo'
  const whatsappMe = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`
  const defaultMessage = es ? settings?.whatsappDefaultMessageEs || 'Hola, quiero reservar un servicio VIP.' : settings?.whatsappDefaultMessageEn || 'Hello, I would like to book a VIP service.'
  const floatingText = es ? settings?.whatsappFloatingTextEs || '¡Escríbenos!' : settings?.whatsappFloatingTextEn || 'Chat with us!'
  const heroImage = settings?.heroImageUrl || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=88'
  const aboutImage = settings?.aboutImageUrl || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=85'
  const instagramHandle = settings?.instagramHandle || '@BlessedTransportSafe'

  const getWhatsappUrl = (message: string) => `${whatsappMe}?text=${encodeURIComponent(message)}`
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
    { _id: 'fallback-suv', name: 'SUV Ejecutivo', category: 'suv', passengers: 6, luggage: 5, available: true, features: ['A/C', 'Confort ejecutivo'] },
    { _id: 'fallback-sedan', name: 'Sedán Privado', category: 'sedan', passengers: 3, luggage: 3, available: true, features: ['A/C', 'Servicio privado'] },
  ]

  const faqs = settings?.faqs?.length ? settings.faqs.map((faq) => ({ question: es ? faq.questionEs || faq.questionEn : faq.questionEn || faq.questionEs, answer: es ? faq.answerEs || faq.answerEn : faq.answerEn || faq.answerEs })) : es
    ? [{ question: '¿El traslado es 100% privado?', answer: 'Sí. El vehículo es exclusivo para usted y las personas incluidas en su reservación.' }, { question: '¿Qué pasa si mi vuelo se retrasa?', answer: 'Su horario se ajustará según el estado del vuelo cuando esté disponible.' }, { question: '¿Cómo reservo y cómo pago?', answer: 'Reserve por WhatsApp y confirme la disponibilidad y el método de pago acordado.' }, { question: '¿Incluyen sillas para bebés y paradas adicionales?', answer: 'Sí, sujeto a disponibilidad. Indíquenos la edad del menor y las paradas al reservar.' }]
    : [{ question: 'Is the transfer 100% private?', answer: 'Yes. The vehicle is exclusively reserved for you and your group.' }, { question: 'What happens if my flight is delayed?', answer: 'Pickup time is adjusted according to flight status whenever available.' }, { question: 'How do I book and pay?', answer: 'Book through WhatsApp to confirm availability and the agreed payment method.' }, { question: 'Do you provide baby seats and extra stops?', answer: 'Yes, subject to availability. Share the child’s age and requested stops when booking.' }]

  const reviews = settings?.reviews?.length ? settings.reviews : es
    ? [{ clientName: 'María González', country: 'España', rating: 5, commentEs: 'Servicio puntual, amable y muy seguro. El viaje desde el aeropuerto fue perfecto.' }, { clientName: 'James Wilson', country: 'Estados Unidos', rating: 5, commentEs: 'Excelente atención y vehículos muy cómodos. Los recomiendo ampliamente.' }, { clientName: 'Ana Rodríguez', country: 'México', rating: 5, commentEs: 'Un tour organizado impecablemente. Todo estuvo claro y sin contratiempos.' }]
    : [{ clientName: 'María González', country: 'Spain', rating: 5, commentEn: 'Punctual, friendly and very safe service. The airport transfer was perfect.' }, { clientName: 'James Wilson', country: 'United States', rating: 5, commentEn: 'Excellent service and very comfortable vehicles. Highly recommended.' }, { clientName: 'Ana Rodríguez', country: 'Mexico', rating: 5, commentEn: 'An impeccably organized tour. Everything was clear and smooth.' }]

  const aboutHighlights = es ? settings?.aboutHighlightsEs?.length ? settings.aboutHighlightsEs : ['Conductores certificados', 'Flota moderna y climatizada', 'Atención personalizada', 'Servicio disponible 24/7'] : settings?.aboutHighlightsEn?.length ? settings.aboutHighlightsEn : ['Certified drivers', 'Modern air-conditioned fleet', 'Personalized service', '24/7 assistance']

  const privacyFallbackEs = `POLÍTICA DE PRIVACIDAD

Blessed Transport Safe recopila únicamente la información necesaria para gestionar reservas de traslados privados, tours y rent car en República Dominicana.

Los datos que podemos solicitar incluyen nombre, número de teléfono de WhatsApp, cantidad de pasajeros y maletas, origen, destino, fecha y hora del servicio. Cuando el servicio sea un traslado aeroportuario, también podremos recibir datos de vuelo para coordinar el horario de recogida. Estos datos se utilizan exclusivamente para confirmar disponibilidad, comunicarnos con el cliente y prestar el servicio solicitado.

Las conversaciones por WhatsApp se utilizan como canal de reserva y atención al cliente. No comercializamos ni vendemos datos personales ni los usamos con fines publicitarios ajenos a Blessed Transport Safe. Limitamos el acceso a la información a nuestro personal autorizado y la conservamos únicamente durante el tiempo necesario para cumplir obligaciones operativas, fiscales, de seguridad o legales.

El cliente podrá solicitar corrección o eliminación de sus datos mediante el WhatsApp oficial ${whatsappNumber}, cuando dicha eliminación no interfiera con obligaciones legales o registros operativos requeridos.

Esta política puede actualizarse para reflejar cambios operativos o legales. La versión vigente estará disponible en esta página web.`

  const termsFallbackEs = `TÉRMINOS Y CONDICIONES

Al solicitar o confirmar una reserva, el pasajero acepta las condiciones operativas de Blessed Transport Safe.

Las reservas se consideran confirmadas únicamente después de recibir la confirmación por WhatsApp. Los precios, horarios, punto de recogida, destino, vehículo y tipo de servicio deben coincidir con la confirmación. La disponibilidad puede cambiar hasta el momento de confirmación.

Para traslados aeroportuarios, el pasajero deberá proporcionar el número de vuelo, aeropuerto, terminal, fecha y hora correctamente. Monitorearemos la llegada cuando sea posible, pero el pasajero es responsable de comunicar cambios urgentes. Normalmente ofrecemos un tiempo de espera razonable sujeto al tipo de reserva y las condiciones reales del aeropuerto.

Los retrasos causados por inmigración, aduanas, pérdida de equipaje o tráfico estarán sujetos a coordinación directa. Las paradas adicionales, sillas para bebés y equipaje especial deben solicitarse antes del servicio y pueden generar cargos o requerir un vehículo distinto.

Blessed Transport Safe no será responsable de pérdidas indirectas, conexiones perdidas, demoras externas o objetos dejados dentro del vehículo. Los pasajeros deberán cuidar su equipaje y notificar inmediatamente cualquier incidencia. Está prohibido transportar objetos peligrosos o ilegales.

El pasajero deberá proporcionar datos reales y seguir las instrucciones del conductor por seguridad y cumplimiento de la ley dominicana.`

  const cancellationFallbackEs = `POLÍTICA DE CANCELACIÓN

Las solicitudes de cancelación o modificación deberán enviarse por WhatsApp al número oficial ${whatsappNumber}. La solicitud se considera recibida al confirmar la hora de recepción por nuestro equipo.

Las cancelaciones realizadas con al menos 24 horas de anticipación a la hora confirmada podrán recibir reembolso o crédito, según el método de pago y las condiciones de la reserva. Las cancelaciones realizadas con menos de 24 horas, las reservaciones de última hora y los servicios ya iniciados podrán generar cargos por hasta el 100 % del servicio.

Las modificaciones de fecha, hora, destino, pasajeros o equipaje están sujetas a disponibilidad y podrían modificar el precio. No se garantiza que una solicitud posterior pueda ser atendida sin cargos adicionales.

Las cancelaciones por vuelos cancelados, cambios de aerolínea, clima severo, emergencias o circunstancias fuera de nuestro control se evaluarán caso por caso. Cuando corresponda, ofreceremos reprogramación o reembolso parcial o total según los costos ya incurridos y las condiciones del proveedor.

Los reembolsos aprobados se procesarán al método original de pago o mediante crédito acordado. Los tiempos de devolución podrán variar según la entidad bancaria o plataforma utilizada.

Para confirmar una reserva, el cliente puede solicitar por escrito el desglose de precio, puntos de recogida, políticas de cancelación y condiciones especiales antes de realizar el pago.`

  const privacyFallbackEn = `PRIVACY POLICY

Blessed Transport Safe collects only the information necessary to manage private transfer, tour and rent car bookings in the Dominican Republic.

We may request name, WhatsApp phone number, passenger and luggage count, pickup and destination locations, date and time. For airport transfers, flight details may also be received to coordinate pickup. This information is used exclusively to confirm availability, communicate with the guest and provide the requested service.

WhatsApp conversations serve as our reservation and customer service channel. We do not sell or commercialize personal data or use it for unrelated advertising. Access is limited to authorized personnel, and information is retained only as long as necessary to meet operational, tax, safety or legal obligations.

Guests may request correction or deletion of their data through our official WhatsApp number ${whatsappNumber}, when deletion does not conflict with legal or required operational records.

This policy may be updated to reflect operational or legal changes. The current version is available on this website.`

  const termsFallbackEn = `TERMS & CONDITIONS

By requesting or confirming a reservation, the guest accepts the operational conditions of Blessed Transport Safe.

A booking is confirmed only after written confirmation through WhatsApp. Prices, schedules, pickup points, destination, vehicle and service type must match the confirmation. Availability may change until the booking is confirmed.

For airport transfers, the guest must provide the flight number, airport, terminal, date and accurate pickup time. We monitor arrivals when possible, but the guest is responsible for promptly reporting urgent changes. Reasonable waiting time is included only under the terms confirmed for the booking.

Delays caused by immigration, customs, baggage issues or traffic require direct coordination. Extra stops, baby seats and special luggage must be requested before service and may require a different vehicle or additional charges.

Blessed Transport Safe is not responsible for indirect losses, missed connections, external delays or belongings left inside vehicles. Passengers must protect their luggage and report incidents immediately. Dangerous or illegal items are not permitted.

Guests must provide accurate information and follow driver instructions for safety and compliance with Dominican Republic regulations.`

  const cancellationFallbackEn = `CANCELLATION POLICY

Cancellation or modification requests must be sent to our official WhatsApp number ${whatsappNumber}. A request is considered received once our team confirms receipt.

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
            <div className="flex rounded-full border border-cyan-200 bg-cyan-50 p-1"><button type="button" onClick={() => setLanguage('es')} className={`rounded-full px-2.5 py-1 text-xs font-bold ${language === 'es' ? 'bg-cyan-600 text-white' : 'text-cyan-700'}`}>ES</button><button type="button" onClick={() => setLanguage('en')} className={`rounded-full px-2.5 py-1 text-xs font-bold ${language === 'en' ? 'bg-cyan-600 text-white' : 'text-cyan-700'}`}>EN</button></div>
            <a href={getWhatsappUrl(defaultMessage)} target="_blank" rel="noopener noreferrer" className="rounded-full bg-cyan-600 px-5 py-3 text-sm font-bold text-white">{copy.book}</a>
          </div>
          <button type="button" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-100 text-cyan-700 md:hidden">{menuOpen ? '×' : '☰'}</button>
        </div>
        {menuOpen && (
          <nav className="border-t border-cyan-100 bg-white px-5 py-5 md:hidden">
            <div className="flex flex-col gap-4"><a onClick={() => setMenuOpen(false)} href="#transfers">{copy.transfers}</a><a onClick={() => setMenuOpen(false)} href="#tours">{copy.tours}</a><a onClick={() => setMenuOpen(false)} href="#fleet">{copy.fleet}</a><a onClick={() => setMenuOpen(false)} href="#rent">{copy.rent}</a><a onClick={() => setMenuOpen(false)} href="#about">{copy.about}</a><div className="flex gap-2"><button type="button" onClick={() => setLanguage('es')} className="rounded-full border border-cyan-200 px-3 py-2 text-xs font-bold">ES</button><button type="button" onClick={() => setLanguage('en')} className="rounded-full border border-cyan-200 px-3 py-2 text-xs font-bold">EN</button></div><a href={getWhatsappUrl(defaultMessage)} target="_blank" rel="noopener noreferrer" className="rounded-full bg-cyan-600 px-5 py-3 text-center text-sm font-bold text-white">{copy.book}</a></div>
          </nav>
        )}
      </header>

      <section id="top" className="relative min-h-[660px] pt-20"><div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(90deg,rgba(255,255,255,.96),rgba(255,255,255,.82) 55%,rgba(207,250,254,.25)),url('${heroImage}')` }} /><div className="relative mx-auto flex min-h-[580px] max-w-7xl items-center px-5 py-16 sm:px-8"><div className="max-w-2xl"><p className="mb-5 inline-flex rounded-full border border-cyan-200 bg-white/90 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-700">{copy.heroBadge}</p><h1 className="text-4xl font-black leading-tight text-slate-900 sm:text-6xl">{copy.heroTitle}</h1><p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">{copy.heroSubtitle}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={getWhatsappUrl(defaultMessage)} target="_blank" rel="noopener noreferrer" className="rounded-full bg-emerald-500 px-7 py-4 text-center text-sm font-extrabold text-white">{copy.heroCta}</a><a href="#tours" className="rounded-full border-2 border-cyan-600 bg-white px-7 py-4 text-center text-sm font-extrabold text-cyan-700">{copy.toursCta}</a></div></div></div></section>

      <section id="transfers" className="bg-cyan-50/40 py-24"><div className="mx-auto max-w-7xl px-5 sm:px-8"><div className="mb-10 max-w-2xl"><p className="text-xs font-extrabold uppercase tracking-[0.24em] text-cyan-600">VIP</p><h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-5xl">{copy.transfersTitle}</h2><p className="mt-4 leading-7 text-slate-600">{copy.transfersSubtitle}</p></div><div className="grid gap-6 lg:grid-cols-[1fr_420px]"><div className="grid gap-5 md:grid-cols-3">{[
        { title: es ? 'Aeropuerto Las Américas' : 'Las Américas Airport', detail: 'SDQ → HOTELS' },
        { title: 'Punta Cana', detail: 'PUJ → PUNTA CANA' },
        { title: es ? 'Rutas Personalizadas' : 'Custom Routes', detail: es ? 'Tu ruta, tu horario' : 'Your route, your schedule' },
      ].map((card) => <article key={card.title} className="rounded-3xl border border-cyan-100 bg-white p-6"><p className="text-xs font-bold text-cyan-600">{card.detail}</p><h3 className="mt-3 text-xl font-black text-slate-900">{card.title}</h3></article>)}</div>
        <form onSubmit={(event) => { event.preventDefault(); window.open(getWhatsappUrl(quoteMessage), '_blank', 'noopener,noreferrer') }} className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-xl shadow-cyan-900/5"><h3 className="mb-4 text-xl font-black text-slate-900">{es ? 'Cotizador rápido' : 'Quick Quote'}</h3><div className="space-y-3"><div><label className="mb-1 block text-xs font-bold text-slate-600">{es ? 'Origen' : 'Origin'}</label><select value={origin} onChange={(e) => setOrigin(e.target.value)} className="w-full rounded-xl border border-cyan-100 px-4 py-3"><option>Aeropuerto Las Américas SDQ</option><option>Aeropuerto Punta Cana PUJ</option><option>Aeropuerto La Romana LRM</option><option>Santo Domingo</option><option>{es ? 'Otro' : 'Other'}</option></select></div>
            <div><label className="mb-1 block text-xs font-bold text-slate-600">{es ? 'Destino' : 'Destination'}</label><input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder={es ? 'Hotel / Zona' : 'Hotel / Area'} className="w-full rounded-xl border border-cyan-100 px-4 py-3" /></div>
            <div><label className="mb-1 block text-xs font-bold text-slate-600">{es ? 'Fecha' : 'Date'}</label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-xl border border-cyan-100 px-4 py-3" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="mb-1 block text-xs font-bold text-slate-600">{es ? 'Pasajeros' : 'Passengers'}</label><select value={passengers} onChange={(e) => setPassengers(e.target.value)} className="w-full rounded-xl border border-cyan-100 px-3 py-3">{Array.from({ length: 14 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n === 14 ? '14+' : n}</option>)}</select></div>
              <div><label className="mb-1 block text-xs font-bold text-slate-600">{es ? 'Maletas' : 'Luggage'}</label><select value={luggage} onChange={(e) => setLuggage(e.target.value)} className="w-full rounded-xl border border-cyan-100 px-3 py-3">{Array.from({ length: 16 }, (_, i) => i).map((n) => <option key={n} value={n}>{n === 15 ? '15+' : n}</option>)}</select></div>
            </div>
            <div><label className="mb-1 block text-xs font-bold text-slate-600">{es ? 'Tipo de viaje' : 'Trip type'}</label><select value={tripType} onChange={(e) => setTripType(e.target.value)} className="w-full rounded-xl border border-cyan-100 px-3 py-3"><option>{es ? 'Solo ida' : 'One way'}</option><option>{es ? 'Ida y vuelta' : 'Round trip'}</option></select></div>
            <button type="submit" className="w-full rounded-full bg-emerald-500 px-5 py-3.5 text-sm font-extrabold text-white">{copy.quote}</button>
          </div></form></div></div></section>

      <section id="tours" className="py-24"><div className="mx-auto max-w-7xl px-5 sm:px-8"><div className="mx-auto mb-12 max-w-2xl text-center"><p className="text-xs font-extrabold uppercase tracking-[0.24em] text-cyan-600">{es ? 'Experiencias seleccionadas' : 'Handpicked experiences'}</p><h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-5xl">{copy.toursTitle}</h2><p className="mt-4 leading-7 text-slate-600">{copy.toursSubtitle}</p></div><div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{displayTours.map((tour) => { const title = es ? tour.title || tour.titleEn : tour.titleEn || tour.title; const titleCategory = tour.category || ''; const showPrice = titleCategory === 'isla-saona' || ['city-tour-full-day','zona-colonial','tres-ojos','faro-a-colon'].includes(titleCategory); const canShowPrice = showPrice && (tour.showPrice === true || typeof tour.priceUsd === 'number'); return <article key={tour._id} className="overflow-hidden rounded-3xl border border-cyan-100 bg-white shadow-sm"><div className="h-64 overflow-hidden bg-cyan-50">{tour.imageUrl && <img src={tour.imageUrl} alt={title} className="h-full w-full object-cover" />}</div><div className="p-6"><h3 className="text-xl font-black text-slate-900">{title}</h3>{tour.description && <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{es ? tour.description : tour.descriptionEn || tour.description}</p>}<p className="mt-4 text-sm font-bold text-cyan-700">{canShowPrice ? `USD $${tour.priceUsd}` : copy.priceQuote}</p><a href={getWhatsappUrl(es ? `Hola, quiero reservar el tour: ${title}.` : `Hello, I want to book the tour: ${title}.`)} target="_blank" rel="noopener noreferrer" className="mt-5 block rounded-full bg-cyan-600 px-5 py-3.5 text-center text-sm font-extrabold text-white">{es ? 'Reservar' : 'Book Now'}</a></div></article>})}</div></div></section>

      <section id="fleet" className="bg-cyan-50/40 py-24"><div className="mx-auto max-w-7xl px-5 sm:px-8"><div className="mb-10 text-center"><p className="text-xs font-extrabold uppercase tracking-[0.24em] text-cyan-600">{es ? 'Nuestra flota' : 'Our fleet'}</p><h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-5xl">{es ? 'Vehículos cómodos y seguros' : 'Comfortable and safe vehicles'}</h2></div><div className="grid gap-6 md:grid-cols-3">{displayVehicles.map((vehicle) => <article key={vehicle._id} className="overflow-hidden rounded-3xl border border-cyan-100 bg-white"><div className="h-56 overflow-hidden bg-cyan-100">{vehicle.photoUrl ? <img src={vehicle.photoUrl} alt={vehicle.name || 'Vehicle'} className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-cyan-600">{es ? 'Vehículo VIP' : 'VIP Vehicle'}</div>}</div><div className="p-6"><h3 className="text-xl font-black text-slate-900">{vehicle.name || (es ? 'Vehículo VIP' : 'VIP Vehicle')}</h3><p className="mt-2 text-sm text-slate-600">{vehicle.passengers || '—'} {es ? 'pasajeros' : 'passengers'} · {es ? 'A/C y equipaje' : 'A/C and luggage'}</p><a href={getWhatsappUrl(es ? `Hola, quiero consultar el vehículo ${vehicle.name}.` : `Hello, I want to check the vehicle ${vehicle.name}.`)} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex rounded-full bg-cyan-600 px-5 py-3 text-sm font-bold text-white">{es ? 'Consultar' : 'Inquire'}</a></div></article>)}</div></div></section>

      <section id="rent" className="px-5 py-12"><div className="mx-auto max-w-7xl rounded-[2rem] bg-gradient-to-r from-teal-500 to-cyan-600 px-6 py-12 text-white sm:px-12 lg:flex lg:items-center lg:justify-between"><div className="max-w-2xl"><p className="text-xs font-extrabold uppercase tracking-[0.24em] text-cyan-100">Mobility &amp; comfort</p><h2 className="mt-3 text-3xl font-black sm:text-5xl">{copy.rentTitle}</h2><p className="mt-4 text-cyan-50">{copy.rentSubtitle}</p></div><a href={getWhatsappUrl(es ? 'Hola, quiero consultar disponibilidad de Rent Car.' : 'Hello, I want to check Rent Car availability.')} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block rounded-full bg-white px-7 py-4 text-sm font-extrabold text-cyan-700 lg:mt-0">{es ? 'Consultar disponibilidad' : 'Check availability'}</a></div></section>

      <section id="about" className="py-24"><div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 md:grid-cols-2"><div className="overflow-hidden rounded-[2rem] border border-cyan-100 bg-cyan-50 p-3"><img src={aboutImage} alt={copy.aboutTitle} className="h-[420px] w-full rounded-[1.5rem] object-cover" /></div><div><p className="text-xs font-extrabold uppercase tracking-[0.24em] text-cyan-600">{copy.aboutBadge}</p><h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-5xl">{copy.aboutTitle}</h2><p className="mt-5 leading-7 text-slate-600">{copy.aboutDescription}</p><ul className="mt-7 grid gap-3 sm:grid-cols-2">{aboutHighlights.map((item) => <li key={item} className="rounded-xl border border-cyan-100 bg-cyan-50/50 px-4 py-3 text-sm font-bold text-slate-700">• {item}</li>)}</ul></div></div></section>

      <section id="reviews" className="bg-cyan-50/40 py-24"><div className="mx-auto max-w-7xl px-5 sm:px-8"><h2 className="text-center text-3xl font-black text-slate-900 sm:text-5xl">{es ? 'Lo que dicen nuestros viajeros' : 'What our travelers say'}</h2><div className="mt-10 grid gap-6 md:grid-cols-3">{reviews.slice(0,3).map((review, index) => <article key={`${review.clientName}-${index}`} className="rounded-3xl border border-cyan-100 bg-white p-7"><div className="text-amber-400" aria-label="5 stars">★★★★★</div><p className="mt-4 text-sm leading-7 text-slate-600">“{es ? review.commentEs : review.commentEn || review.commentEs}”</p><p className="mt-5 font-extrabold text-slate-900">{review.clientName}</p><p className="text-sm text-cyan-700">{review.country}</p></article>)}</div></div></section>

      <section id="faq" className="py-24"><div className="mx-auto max-w-4xl px-5 sm:px-8"><h2 className="mb-10 text-center text-3xl font-black text-slate-900 sm:text-5xl">{copy.faqTitle}</h2><div className="space-y-3">{faqs.map((faq, index) => <article key={faq.question} className="rounded-2xl border border-cyan-100 bg-white"><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between px-5 py-5 text-left font-extrabold text-slate-900"><span>{faq.question}</span><span className="text-cyan-700">{openFaq === index ? '−' : '+'}</span></button>{openFaq === index && <p className="border-t border-cyan-50 px-5 py-5 text-sm leading-7 text-slate-600">{faq.answer}</p>}</article>)}</div></div></section>

      <footer className="border-t border-cyan-100 bg-cyan-50/60 py-12"><div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 md:grid-cols-3"><div><p className="text-lg font-extrabold text-cyan-700">Blessed <span className="text-amber-500">Transport</span> Safe</p><p className="mt-3 text-sm text-slate-600">{copy.footerDescription}</p></div><div><p className="font-black">WhatsApp</p><a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="mt-3 block text-sm font-semibold text-cyan-700">{whatsappNumber}</a></div><div><p className="font-black">Instagram</p><a href={`https://www.instagram.com/${instagramHandle.replace('@','')}`} target="_blank" rel="noopener noreferrer" className="mt-3 block text-sm font-semibold text-cyan-700">{instagramHandle}</a></div></div><div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-cyan-100 px-5 pt-6 text-center sm:px-8 md:flex-row"><p className="text-xs text-slate-500">© 2026 Blessed Transport Safe. {es ? 'Todos los derechos reservados.' : 'All rights reserved.'}</p><div className="flex flex-wrap justify-center gap-5 text-xs font-semibold text-cyan-700"><button type="button" onClick={() => setActivePolicy('privacy')}>{es ? 'Política de Privacidad' : 'Privacy Policy'}</button><button type="button" onClick={() => setActivePolicy('terms')}>{es ? 'Términos y Condiciones' : 'Terms & Conditions'}</button><button type="button" onClick={() => setActivePolicy('cancellation')}>{es ? 'Política de Cancelación' : 'Cancellation Policy'}</button></div><p className="text-xs text-slate-400">{es ? 'Creado por IntegratCore' : 'Created by IntegratCore'}</p></div></footer>

      {activePolicy && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/30 px-5 backdrop-blur-sm" role="dialog" aria-modal="true"><div className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"><div className="flex items-start justify-between gap-5"><h2 className="text-2xl font-black">{policyContent[activePolicy][0]}</h2><button type="button" onClick={() => setActivePolicy(null)} className="text-2xl text-cyan-700">×</button></div><p className="mt-5 text-sm leading-7 text-slate-600">{policyContent[activePolicy][1]}</p></div></div>}

      {settings?.showFloatingWhatsapp !== false && <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label={floatingText} className="fixed bottom-6 right-6 z-50 grid h-16 w-16 place-items-center rounded-full bg-emerald-500 text-2xl text-white shadow-2xl">{floatingText === '¡Escríbenos!' || floatingText === 'Chat with us!' ? 'W' : 'W'}</a>}
    </main>
  )
}