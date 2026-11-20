import { defineField, defineType } from 'sanity';

export const vehicleType = defineType({
  name: 'vehicle',
  title: 'Flota (Traslados)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
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
      title: 'Tarifa diaria en USD',
      type: 'number',
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