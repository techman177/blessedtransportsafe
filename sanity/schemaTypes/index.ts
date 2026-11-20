import { tourType } from './tour';
import { vehicleType } from './vehicle';
import { rentCarType } from './rentCar';
import { transferRouteType } from './transferRoute';
import { siteSettingsType } from './siteSettings';

export { tourType, vehicleType, rentCarType, transferRouteType, siteSettingsType };

export const schema = {
  types: [tourType, vehicleType, rentCarType, transferRouteType, siteSettingsType],
};