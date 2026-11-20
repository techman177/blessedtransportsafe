import { defineField, defineType } from 'sanity'

export const rentCarType = defineType({
  name: 'rentCar',
  title: 'Vehículos Rent Car',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'pricePerDay',
      title: 'Precio por día',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'pricePerDay', media: 'image' },
  },
})
