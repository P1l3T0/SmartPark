import type { Booking } from "./interfaces";

export const carBrands: Record<string, string> = {
  BMW: "bmw",
  "Mercedes-Benz": "mercedes-benz",
  Toyota: "toyota",
  Honda: "honda",
  Ford: "ford",
  Chevrolet: "chevrolet",
  Volkswagen: "volkswagen",
  Audi: "audi",
  Hyundai: "hyundai",
  Nissan: "nissan",
  Kia: "kia",
  Subaru: "subaru",
  Mazda: "mazda",
  Lexus: "lexus",
  Jeep: "jeep",
  Dodge: "dodge",
};

export const bookings: Booking[] = [
  {
    id: 1,
    dateCreated: new Date("2026-03-01"),
    vehicle: "CB 1234 AB",
    parkingSpot: "P1",
    startTime: new Date("2026-03-10T08:00:00"),
    endTime: new Date("2026-03-10T10:00:00"),
    isCancelled: false,
  },
  {
    id: 2,
    dateCreated: new Date("2026-03-05"),
    vehicle: "CB 5678 CD",
    parkingSpot: "P2",
    startTime: new Date("2026-03-12T09:00:00"),
    endTime: new Date("2026-03-12T11:30:00"),
    isCancelled: false,
  },
  {
    id: 3,
    dateCreated: new Date("2026-03-08"),
    vehicle: "CB 9101 EF",
    parkingSpot: "P3",
    startTime: new Date("2026-03-15T14:00:00"),
    endTime: new Date("2026-03-15T16:00:00"),
    isCancelled: true,
  },
  {
    id: 4,
    dateCreated: new Date("2026-03-10"),
    vehicle: "CB 1234 AB",
    parkingSpot: "P4",
    startTime: new Date("2026-03-20T07:30:00"),
    endTime: new Date("2026-03-20T09:00:00"),
    isCancelled: false,
  },
];

export const total = bookings.length;
export const active = bookings.filter((b) => !b.isCancelled).length;
export const cancelled = bookings.filter((b) => b.isCancelled).length;
