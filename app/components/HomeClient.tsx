'use client'

import { useEffect, useState } from 'react'
import { CalendarDays, CarFront, Clock3, Menu, ShieldCheck, Users, X } from 'lucide-react'

export type Tour = {
  _id: string
  title?: string
  titleEn?: string
  duration?: string
  durationEn?: string
  description?: string
  descriptionEn?: string
  imageUrl?: string
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
  features?: string[]
  available?: boolean
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
    quote: 'Solicitar cotización', sdq: 'Aeropuerto Las Américas', puy: 'Punta Cana', custom: 'Rutas Personalizadas',
    rentEyebrow: 'Mobility & comfort', rentTitle: 'Rent Car para explorar sin límites', rentText: 'SUV, sedanes y vehículos ejecutivos disponibles según tu itinerario.',
    rentButton: 'Consultar disponibilidad', footerText: 'VIP Transfers, tours y rent car en República Dominicana.',
    floating: 'Chatear por WhatsApp',
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
    floating: 'Chat on WhatsApp',
  },
} as const

const fallbackTours: Tour[] = [
  {
    _id: 'fallback-samana',
    title: 'Samaná Aventura y Playas',
    titleEn: 'Samaná Adventure & Beaches',
    duration: 'Día completo', durationEn: 'Full day',
    description: 'Naturaleza, playas espectaculares y paisajes inolvidables en una experiencia de día completo.',
    descriptionEn: 'Nature, spectacular beaches and unforgettable landscapes on a full-day experience.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
  },
  {
    _id: 'fallback-saona',
    title: 'Excursión Isla Saona',
    titleEn: 'Saona Island Excursion',
    duration: 'Día completo', durationEn: 'Full day',
    description: 'Aguas turquesas, arena blanca y una escapada perfecta al paraíso caribeño.',
    descriptionEn: 'Turquoise waters, white sand and the perfect escape to a Caribbean paradise.',
    imageUrl: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=85',
  },
  {
    _id: 'fallback-colonial',
    title: 'Zona Colonial',
    titleEn: 'Colonial Zone',
    duration: 'Medio día', durationEn: 'Half day',
    description: 'Recorre historia, arquitectura y rincones emblemáticos de Santo Domingo.',
    descriptionEn: 'Explore the history, architecture and iconic corners of Santo Domingo.',
    imageUrl: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?auto=format&fit=crop&w=1200&q=85',
  },
]

export default function HomeClient({ tours, transfers, vehicles }: { tours: Tour[]; transfers: TransferRoute[]; vehicles: Vehicle[] }) {
  const [language, setLanguage] = useState<'es' | 'en'>('es')
  const [menuOpen, setMenuOpen] = useState(false)
  const t = copy[language]
  const displayTours = tours.length > 0 ? tours : fallbackTours

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const transferCards = [
    { title: t.sdq, detail: 'SDQ → Hotels', icon: <ShieldCheck className="h-7 w-7" /> },
    { title: t.puy, detail: 'PUJ → Punta Cana', icon: <CarFront className="h-7 w-7" /> },
    { title: t.custom, detail: language === 'es' ? 'Tu ruta, tu horario' : 'Your route, your schedule', icon: <Users className="h-7 w-7" /> },
  ]

  const availableVehicles = vehicles.filter((vehicle) => vehicle.available !== false).length

  const trustCards = [
    { icon: <Clock3 className="h-5 w-5" />, label: t.punctual },
    { icon: <CarFront className="h-5 w-5" />, label: t.comfortable },
    { icon: <ShieldCheck className="h-5 w-5" />, label: t.support },
  ]

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-800">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-cyan-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="leading-tight" aria-label="Blessed Transport Safe">
            <span className="block text-lg font-extrabold tracking-tight text-cyan-700 sm:text-xl">Blessed <span className="text-amber-500">Transport</span> Safe</span>
            <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">VIP Transfers &amp; Tours</span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            <a className="text-sm font-semibold text-slate-700 hover:text-cyan-700" href="#tours">{t.navTours}</a>
            <a className="text-sm font-semibold text-slate-700 hover:text-cyan-700" href="#transfers">{t.navTransfers}</a>
            <a className="text-sm font-semibold text-slate-700 hover:text-cyan-700" href="#rent">{t.navRent}</a>
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <div className="flex rounded-full border border-cyan-200 bg-cyan-50 p-1">
              <button type="button" onClick={() => setLanguage('es')} className={`rounded-full px-2.5 py-1 text-xs font-bold transition ${language === 'es' ? 'bg-cyan-600 text-white' : 'text-cyan-700'}`}>ES</button>
              <button type="button" onClick={() => setLanguage('en')} className={`rounded-full px-2.5 py-1 text-xs font-bold transition ${language === 'en' ? 'bg-cyan-600 text-white' : 'text-cyan-700'}`}>EN</button>
            </div>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="rounded-full bg-cyan-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-200 transition hover:bg-cyan-700">{t.book}</a>
          </div>

          <button type="button" className="rounded-lg p-2 text-cyan-700 sm:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-cyan-100 bg-white px-5 py-5 sm:hidden">
            <nav className="flex flex-col gap-4">
              <a onClick={() => setMenuOpen(false)} href="#tours">{t.navTours}</a>
              <a onClick={() => setMenuOpen(false)} href="#transfers">{t.navTransfers}</a>
              <a onClick={() => setMenuOpen(false)} href="#rent">{t.navRent}</a>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setLanguage('es')} className="rounded-full border border-cyan-200 px-3 py-1.5 text-sm font-bold">ES</button>
                <button type="button" onClick={() => setLanguage('en')} className="rounded-full border border-cyan-200 px-3 py-1.5 text-sm font-bold">EN</button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <section id="top" className="relative min-h-[660px] pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "linear-gradient(90deg, rgba(255,255,255,.96) 0%, rgba(255,255,255,.84) 44%, rgba(207,250,254,.28) 100%), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=88')" }}
        />
        <div className="absolute bottom-0 right-0 h-40 w-64 rounded-tl-[100%] bg-cyan-100/60" />
        <div className="relative mx-auto flex min-h-[580px] max-w-7xl items-center px-5 py-16 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="mb-5 inline-flex rounded-full border border-cyan-200 bg-white/90 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-700 shadow-sm">{t.heroLabel}</p>
            <h1 className="text-4xl font-black leading-[1.08] text-slate-900 sm:text-6xl">{t.heroTitle}</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">{t.heroText}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappUrl(language === 'es' ? 'Hola, quiero reservar un servicio VIP con Blessed Transport Safe.' : 'Hello, I would like to book a VIP service with Blessed Transport Safe.')} target="_blank" rel="noopener noreferrer" className="rounded-full bg-emerald-500 px-7 py-4 text-center text-sm font-extrabold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-600">{t.whatsapp}</a>
              <a href="#tours" className="rounded-full border-2 border-cyan-600 bg-white px-7 py-4 text-center text-sm font-extrabold text-cyan-700 transition hover:bg-cyan-50">{t.seeTours}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-16 px-5 sm:px-8">
        <div className="mx-auto grid max-w-5xl gap-3 rounded-3xl border border-cyan-100 bg-white p-3 shadow-xl shadow-cyan-900/5 md:grid-cols-3">
          {trustCards.map((item) => (
            <div key={item.label} className="flex items-center gap-3 rounded-2xl bg-cyan-50 px-5 py-4 text-slate-700">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-cyan-600 shadow-sm">{item.icon}</span>
              <span className="text-sm font-bold">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="tours" className="bg-cyan-50/40 py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-cyan-600">{t.toursEyebrow}</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-5xl">{t.toursTitle}</h2>
            <p className="mt-4 leading-7 text-slate-600">{t.toursText}</p>
          </div>

          {displayTours.length > 0 ? (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {displayTours.map((tour) => {
                const title = language === 'es' ? (tour.title || tour.titleEn || 'Tour') : (tour.titleEn || tour.title || 'Tour')
                const duration = language === 'es' ? (tour.duration || tour.durationEn) : (tour.durationEn || tour.duration)
                const description = language === 'es' ? tour.description : tour.descriptionEn
                const message = language === 'es'
                  ? `Hola, quiero reservar el tour: ${title}. ¿Podrían brindarme disponibilidad y detalles?`
                  : `Hello, I would like to book the tour: ${title}. Could you share availability and details?`

                return (
                  <article key={tour._id} className="group overflow-hidden rounded-3xl border border-cyan-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-900/10">
                    <div className="relative h-64 overflow-hidden bg-cyan-100">
                      {tour.imageUrl ? <img src={tour.imageUrl} alt={title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /> : <div className="grid h-full place-items-center text-cyan-700"><CalendarDays className="h-12 w-12" /></div>}
                      {duration && <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-cyan-700 shadow-md">{t.duration}: {duration}</span>}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-black text-slate-900">{title}</h3>
                      {description && <p className="mt-3 line-clamp-3 min-h-18 text-sm leading-6 text-slate-600">{description}</p>}
                      <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-cyan-600 px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-cyan-700">{t.reserveTour}</a>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : <p className="text-center text-slate-500">{t.noTours}</p>}
        </div>
      </section>

      <section id="transfers" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-cyan-600">{t.transfersEyebrow}</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-5xl">{t.transfersTitle}</h2>
            <p className="mt-4 leading-7 text-slate-600">{t.transfersText}</p>
            {transfers.length > 0 && <p className="mt-3 text-xs font-bold text-cyan-700">{transfers.length} {language === 'es' ? 'rutas disponibles' : 'routes available'}</p>}
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {transferCards.map((card) => {
              const message = language === 'es'
                ? `Hola, necesito una cotización de traslado: ${card.title}.`
                : `Hello, I need a transfer quote for: ${card.title}.`
              return (
                <article key={card.title} className="rounded-3xl border border-cyan-100 bg-cyan-50/40 p-7 transition hover:border-cyan-300 hover:bg-cyan-50">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-cyan-600 shadow-sm">{card.icon}</div>
                  <p className="mt-6 text-xs font-bold uppercase tracking-wider text-cyan-600">{card.detail}</p>
                  <h3 className="mt-2 text-xl font-black text-slate-900">{card.title}</h3>
                  <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex text-sm font-extrabold text-cyan-700 hover:text-cyan-900">{t.quote} →</a>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="rent" className="px-5 py-8 sm:px-8 sm:pb-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-teal-500 to-cyan-600 px-6 py-12 text-white shadow-xl shadow-cyan-200 sm:px-12 lg:flex lg:items-center lg:justify-between lg:px-16">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-cyan-100">{t.rentEyebrow}</p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">{t.rentTitle}</h2>
            <p className="mt-4 max-w-xl leading-7 text-cyan-50">{t.rentText}</p>
            {availableVehicles > 0 && (
              <p className="mt-3 text-xs font-extrabold uppercase tracking-wider text-white">
                {availableVehicles} {language === 'es' ? 'vehículos disponibles' : 'vehicles available'}
              </p>
            )}
          </div>
          <a href={whatsappUrl(language === 'es' ? 'Hola, quiero consultar disponibilidad de Rent Car.' : 'Hello, I would like to check Rent Car availability.')} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex rounded-full bg-white px-7 py-4 text-sm font-extrabold text-cyan-700 shadow-lg transition hover:bg-cyan-50 lg:mt-0">{t.rentButton}</a>
        </div>
      </section>

      <footer className="border-t border-cyan-100 bg-cyan-50/60 py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 md:grid-cols-3 lg:px-12">
          <div>
            <p className="text-lg font-extrabold text-cyan-700">Blessed <span className="text-amber-500">Transport</span> Safe</p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">{t.footerText}</p>
          </div>
          <div>
            <p className="text-sm font-black text-slate-900">WhatsApp</p>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="mt-3 block text-sm font-semibold text-cyan-700">+1 809-447-7101</a>
          </div>
          <div>
            <p className="text-sm font-black text-slate-900">Instagram</p>
            <a href="https://www.instagram.com/BlessedTransportSafe" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg> @BlessedTransportSafe</a>
          </div>
        </div>
      </footer>

      <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" aria-label={t.floating} className="fixed bottom-6 right-6 z-50 grid h-16 w-16 place-items-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-900/20 transition hover:scale-105 hover:bg-emerald-600">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-8 w-8" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /><path d="M8.5 8.5c.5 3.5 3 6 6.5 6.5" /></svg>
      </a>
    </main>
  )
}
