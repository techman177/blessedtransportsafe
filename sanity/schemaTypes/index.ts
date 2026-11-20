import { vehicleType } from './vehicle';
import { transferRouteType } from './transferRoute';
import { tourType } from './tour';
import { rentCarType } from './rentCar';
import { siteSettingsType } from './siteSettings';

export { vehicleType, transferRouteType, tourType, rentCarType, siteSettingsType };

export const schema = {
  types: [vehicleType, transferRouteType, tourType, rentCarType, siteSettingsType],
};