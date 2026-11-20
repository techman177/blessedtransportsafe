import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      S.documentTypeListItem('vehicle').title('1. Flota (Traslados VIP)'),
      S.documentTypeListItem('transferRoute').title('2. Rutas de Aeropuerto'),
      S.documentTypeListItem('tour').title('3. Tours y Excursiones'),
      S.documentTypeListItem('rentCar').title('4. Vehículos Rent Car'),
      S.documentTypeListItem('siteSettings').title('5. Configuración de Portada'),
    ])
