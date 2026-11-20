import {defineField, defineType} from 'sanity'

export const transferRouteType = defineType({
  name: 'transferRoute',
  title: '2. Rutas de Aeropuerto',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
    }),
    defineField({
      name: 'airport',
      title: 'Aeropuerto',
      type: 'string',
    }),
    defineField({
      name: 'hotelZone',
      title: 'Zona de hoteles',
      type: 'string',
    }),
    defineField({
      name: 'privateRateUsd',
      title: 'Tarifa privada en USD',
      type: 'number',
      validation: (Rule) => Rule.min(0).warning(),
    }),
    defineField({
      name: 'estimatedTime',
      title: 'Tiempo estimado',
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
