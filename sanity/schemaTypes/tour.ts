import { defineField, defineType } from 'sanity';

export const tourType = defineType({
  name: 'tour',
  title: 'Tours y Excursiones',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título (Español)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL amigable (Slug)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priceUsd',
      title: 'Precio en USD (Opcional)',
      type: 'number',
      validation: (Rule) => Rule.min(0),
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
      validation: (Rule) => Rule.required(),
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