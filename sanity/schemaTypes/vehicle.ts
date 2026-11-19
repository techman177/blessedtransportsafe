import { defineField, defineType } from 'sanity';

export const vehicleType = defineType({
  name: 'vehicle',
  title: 'Rent Car / Vehículos',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
          { title: 'Rent Car', value: 'rent-car' },
        ],
      },
      initialValue: 'rent-car',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dailyRateUsd',
      title: 'Tarifa diaria en USD',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'passengers',
      title: 'Pasajeros',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(50),
    }),
    defineField({
      name: 'luggage',
      title: 'Maletas',
      type: 'number',
      validation: (Rule) => Rule.required().min(0).max(50),
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
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