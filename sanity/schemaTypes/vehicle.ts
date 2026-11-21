import { defineField, defineType } from 'sanity';

export const vehicleType = defineType({
  name: 'vehicle',
  title: '1. Flota (Traslados VIP)',
  type: 'document',
  fields: [
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
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Van / Minibus VIP', value: 'van-vip' },
          { title: 'SUV / Ejecutivo', value: 'suv' },
          { title: 'Sedán Privado', value: 'sedan' },
        ],
        layout: 'radio',
      },
      initialValue: 'van-vip',
    }),
    defineField({
      name: 'dailyRateUsd',
      title: 'Tarifa diaria en USD ($)',
      type: 'number',
      description: 'Ingrese únicamente el monto numérico, sin el signo $.',
      validation: (Rule) => Rule.min(0).warning(),
    }),
    defineField({
      name: 'passengers',
      title: 'Pasajeros',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(50).warning(),
    }),
    defineField({
      name: 'luggage',
      title: 'Maletas',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(50).warning(),
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'features',
      title: 'Características',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'featuresEn',
      title: 'Features (EN)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'featuresIt',
      title: 'Caratteristiche (IT)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'available',
      title: 'Disponibilidad',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'name', media: 'photo', subtitle: 'category' },
  },
});