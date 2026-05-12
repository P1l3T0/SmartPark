import dayjs from 'dayjs';

export interface IParkingSpot {
  id?: number;
  dateCreated?: dayjs.Dayjs;
  slotNumber?: string;
}

export const defaultValue: Readonly<IParkingSpot> = {};
