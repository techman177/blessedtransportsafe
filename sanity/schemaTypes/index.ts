import { defineField, defineType } from 'sanity';

export const tourType = defineType({
  name: 'tour',
  title: 'Tours y Excursiones',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre del Tour / Excursión',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: '1. Cuevas Los 3 Ojos', value: 'tres-ojos' },
          { title: '2. Faro a Colón', value: 'faro-a-colon' },
          { title: '3. Zona Colonial (Ciudad Histórica Santo Domingo)', value: 'zona-colonial' },
          { title: 'Excursión Isla Saona', value: 'isla-saona' },
          { title: 'Buggies / Aventura', value: 'buggies' },
          { title: 'Tour en la Ciudad', value: 'city-tour' },
        ],
      },
      initialValue: 'tres-ojos',
    }),
    defineField({
      name: 'priceUsd',
      title: 'Precio en USD ($)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'duration',
      title: 'Duración (Ej: 3 horas / Día completo)',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Foto principal',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'includes',
      title: 'Incluye (Ej: Transporte, entradas, guías, bebidas)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'featured',
      title: 'Destacar en portada',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});

import { vehicleType } from './vehicle';
import { transferRouteType } from './transferRoute';
import { siteSettingsType } from './siteSettings';

export { vehicleType, transferRouteType, siteSettingsType };

export const schema = {
  types: [tourType, vehicleType, transferRouteType, siteSettingsType],
};