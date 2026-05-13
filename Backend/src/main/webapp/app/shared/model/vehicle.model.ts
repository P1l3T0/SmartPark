import dayjs from 'dayjs';

import { VehicleStatus } from 'app/shared/model/enumerations/vehicle-status.model';
import { IUserProfile } from 'app/shared/model/user-profile.model';

export interface IVehicle {
  id?: number;
  dateCreated?: dayjs.Dayjs;
  registrationNumber?: string;
  model?: string;
  brand?: string;
  isPrimary?: boolean | null;
  status?: keyof typeof VehicleStatus;
  owner?: IUserProfile;
}

export const defaultValue: Readonly<IVehicle> = {
  isPrimary: false,
};
