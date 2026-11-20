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
    }),
    defineField({
      name: 'origin',
      title: 'Origen',
      type: 'string',
    }),
    defineField({
      name: 'destination',
      title: 'Destino',
      type: 'string',
    }),
    defineField({
      name: 'priceUsd',
      title: 'Tarifa privada en USD',
      type: 'number',
      validation: (Rule) => Rule.min(0).warning(),
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