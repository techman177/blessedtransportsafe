import { defineField, defineType } from 'sanity';

export const routeType = defineType({
  name: 'route',
  title: 'Rutas y Tarifas (USD)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre de la ruta',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'origin',
      title: 'Origen',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'destination',
      title: 'Destino',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priceUsd',
      title: 'Tarifa privada en USD',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'estimatedTime',
      title: 'Tiempo estimado',
      type: 'string',
    }),
    defineField({
      name: 'featured',
      title: 'Destacar',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});