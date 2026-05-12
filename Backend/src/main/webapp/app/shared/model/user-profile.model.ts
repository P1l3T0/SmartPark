import dayjs from 'dayjs';

import { IUser } from 'app/shared/model/user.model';

export interface IUserProfile {
  id?: number;
  phoneNumber?: string | null;
  photoUrl?: string | null;
  dateCreated?: dayjs.Dayjs;
  dateUpdated?: dayjs.Dayjs | null;
  user?: IUser;
}

export const defaultValue: Readonly<IUserProfile> = {};
