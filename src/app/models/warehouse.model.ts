// tslint:disable:variable-name
import {CoordsModel} from './coords.model';

export class WarehouseModel {
  id?: string;
  name?: string;
  cars_location?: string;
  coords: CoordsModel;
}
