import {defineField, defineType} from 'sanity'
import {CurrencyNumberInput} from '../components/CurrencyNumberInput'

export const transferRouteType = defineType({
  name: 'transferRoute',
  title: '2. Rutas de Aeropuerto',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
      description: 'Número para ordenar (ej. 1, 2, 3)',
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
    }),
    defineField({
      name: 'titleEn',
      title: 'Title (EN)',
      type: 'string',
    }),
    defineField({
      name: 'titleIt',
      title: 'Titolo (IT)',
      type: 'string',
    }),
    defineField({
      name: 'airport',
      title: 'Aeropuerto',
      type: 'string',
    }),
    defineField({
      name: 'airportEn',
      title: 'Airport (EN)',
      type: 'string',
    }),
    defineField({
      name: 'airportIt',
      title: 'Aeroporto (IT)',
      type: 'string',
    }),
    defineField({
      name: 'hotelZone',
      title: 'Zona de hoteles',
      type: 'string',
    }),
    defineField({
      name: 'hotelZoneEn',
      title: 'Hotel zone / destination (EN)',
      type: 'string',
    }),
    defineField({
      name: 'hotelZoneIt',
      title: 'Zona hotel / destinazione (IT)',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Imagen de la ruta',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'privateRateUsd',
      title: 'Tarifa privada en USD ($)',
      type: 'number',
      description: 'Ingrese únicamente el monto numérico, sin el signo $.',
      components: {input: CurrencyNumberInput},
      validation: (Rule) => Rule.min(0).warning(),
    }),
    defineField({
      name: 'estimatedTime',
      title: 'Tiempo estimado',
      type: 'string',
    }),
    defineField({
      name: 'estimatedTimeEn',
      title: 'Estimated time (EN)',
      type: 'string',
    }),
    defineField({
      name: 'estimatedTimeIt',
      title: 'Tempo stimato (IT)',
      type: 'string',
    }),
    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'hotelZone'},
  },
})
