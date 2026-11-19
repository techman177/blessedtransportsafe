import {defineField, defineType} from 'sanity'

export const transferRouteType = defineType({
  name: 'transferRoute',
  title: 'Transporte Aeropuerto a Hoteles',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'airport',
      title: 'Aeropuerto',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hotelZone',
      title: 'Zona de hoteles',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'privateRateUsd',
      title: 'Tarifa privada en USD',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'estimatedTime',
      title: 'Tiempo estimado',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
