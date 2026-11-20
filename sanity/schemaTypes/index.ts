import { tourType } from './tour';
import { vehicleType } from './vehicle';
import { transferRouteType } from './transferRoute';
import { siteSettingsType } from './siteSettings';

export { tourType, vehicleType, transferRouteType, siteSettingsType };

export const schema = {
  types: [tourType, vehicleType, transferRouteType, siteSettingsType],
};