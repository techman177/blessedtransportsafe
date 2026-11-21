import { defineField, defineType } from 'sanity'
import {CurrencyNumberInput} from '../components/CurrencyNumberInput'

export const rentCarType = defineType({
  name: 'rentCar',
  title: '4. Vehículos Rent Car',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
      description: 'Número para ordenar (ej. 1, 2, 3)',
    }),
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
    }),
    defineField({
      name: 'nameEn',
      title: 'Name (EN)',
      type: 'string',
    }),
    defineField({
      name: 'nameIt',
      title: 'Nome (IT)',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Galería de imágenes',
      type: 'array',
      options: { layout: 'grid' },
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description (EN)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'descriptionIt',
      title: 'Descrizione (IT)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'pricePerDay',
      title: 'Precio por día (USD $)',
      type: 'number',
      description: 'Ingrese únicamente el monto numérico, sin el signo $.',
      components: {input: CurrencyNumberInput},
      validation: (Rule) => Rule.min(0).warning(),
    }),
    defineField({
      name: 'passengers',
      title: 'Capacidad de pasajeros',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(50).warning(),
    }),
    defineField({
      name: 'luggage',
      title: 'Capacidad de maletas',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(50).warning(),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'pricePerDay', media: 'image' },
  },
})
