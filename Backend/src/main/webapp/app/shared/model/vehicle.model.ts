import dayjs from 'dayjs';

import { IUserProfile } from 'app/shared/model/user-profile.model';

export interface IVehicle {
  id?: number;
  dateCreated?: dayjs.Dayjs;
  registrationNumber?: string;
  model?: string;
  brand?: string;
  isPrimary?: boolean | null;
  owner?: IUserProfile;
}

export const defaultValue: Readonly<IVehicle> = {
  isPrimary: false,
};
