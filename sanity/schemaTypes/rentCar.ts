import { defineField, defineType } from 'sanity'

export const rentCarType = defineType({
  name: 'rentCar',
  title: '4. Vehículos Rent Car',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true },
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
      validation: (Rule) => Rule.min(0).warning(),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'pricePerDay', media: 'image' },
  },
})
