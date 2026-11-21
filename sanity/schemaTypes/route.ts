import { defineField, defineType } from 'sanity';
import {CurrencyNumberInput} from '../components/CurrencyNumberInput'

export const routeType = defineType({
  name: 'route',
  title: 'Rutas y Tarifas (USD)',
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
      title: 'Tarifa privada en USD ($)',
      type: 'number',
      description: 'Ingrese únicamente el monto numérico, sin el signo $.',
      components: {input: CurrencyNumberInput},
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