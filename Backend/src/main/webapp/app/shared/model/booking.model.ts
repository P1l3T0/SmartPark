import dayjs from 'dayjs';

import { BookingStatus } from 'app/shared/model/enumerations/booking-status.model';
import { IParkingSpot } from 'app/shared/model/parking-spot.model';
import { IUserProfile } from 'app/shared/model/user-profile.model';
import { IVehicle } from 'app/shared/model/vehicle.model';

export interface IBooking {
  id?: number;
  startDate?: dayjs.Dayjs;
  endDate?: dayjs.Dayjs;
  dateCreated?: dayjs.Dayjs;
  status?: keyof typeof BookingStatus;
  userProfile?: IUserProfile;
  vehicle?: IVehicle;
  parkingSpot?: IParkingSpot;
}

export const defaultValue: Readonly<IBooking> = {};
