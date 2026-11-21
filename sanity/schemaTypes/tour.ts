import { defineField, defineType } from 'sanity';
import {CurrencyNumberInput} from '../components/CurrencyNumberInput'

export const tourType = defineType({
  name: 'tour',
  title: '3. Tours y Excursiones',
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
      title: 'Título (Español)',
      type: 'string',
    }),
    defineField({
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'URL amigable (Slug)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Cuevas Los 3 Ojos', value: 'tres-ojos' },
          { title: 'Faro a Colón', value: 'faro-a-colon' },
          { title: 'Zona Colonial', value: 'zona-colonial' },
          { title: 'City Tour Santo Domingo Full Day', value: 'city-tour-full-day' },
          { title: 'Excursión Isla Saona', value: 'isla-saona' },
          { title: 'Buggies / Aventura', value: 'buggies' },
          { title: 'Samaná Aventura / Playas', value: 'samana' },
        ],
      },
    }),
    defineField({
      name: 'priceUsd',
      title: 'Precio en USD ($) (Opcional)',
      type: 'number',
      description: 'Ingrese únicamente el monto numérico, sin el signo $.',
      components: {input: CurrencyNumberInput},
      validation: (Rule) => Rule.min(0).warning(),
    }),
    defineField({
      name: 'showPrice',
      title: 'Mostrar precio en la web',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'duration',
      title: 'Duración (Español)',
      type: 'string',
    }),
    defineField({
      name: 'durationEn',
      title: 'Duration (English)',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Imagen principal',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Descripción (Español)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description (English)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'includes',
      title: 'Incluye (Español)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'includesEn',
      title: 'Includes (English)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'notIncluded',
      title: 'No incluye (Español)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'notIncludedEn',
      title: 'Not included (English)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'featured',
      title: 'Destacar',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'title', media: 'image', subtitle: 'category' },
  },
});