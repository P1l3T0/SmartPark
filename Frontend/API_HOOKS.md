# API Hooks – Pending Server-Side Implementation

This document lists all frontend API hooks that currently have **no backend endpoints** returning data. Each section covers the page, the hook(s) used, the endpoint path, the HTTP method, and the expected request/response interfaces.

---

## Vehicles Page

### `useGetUserVehicles`

| Detail | Value |
|---|---|
| **Hook** | `useGetUserVehicles` |
| **Method** | `GET` |
| **Endpoint** | `vehicle/get/user-vehicles` |
| **Response** | `VehicleResponse[]` |

```typescript
interface VehicleResponse extends Base {
  brand: string;
  model: string;
  registrationNumber: string;
  isPrimary: boolean;
}
```

### `useCreateVehicle`

| Detail | Value |
|---|---|
| **Hook** | `useCreateVehicle` |
| **Method** | `POST` |
| **Endpoint** | `vehicle/create` |
| **Request Body** | `VehicleRequest` |

```typescript
interface VehicleRequest {
  brand: string;
  model: string;
  registrationNumber: string;
  isPrimary: boolean;
  isUpdating?: boolean;
}
```

### `useUpdateVehicle`

| Detail | Value |
|---|---|
| **Hook** | `useUpdateVehicle` |
| **Method** | `PUT` |
| **Endpoint** | `vehicle/update/{vehicleId}` |
| **Request Body** | `VehicleRequest` |

Uses the same `VehicleRequest` interface as above.

### `useDeleteVehicle`

| Detail | Value |
|---|---|
| **Hook** | `useDeleteVehicle` |
| **Method** | `DELETE` |
| **Endpoint** | `vehicle/delete/{vehicleId}` |

No request body. The vehicle ID is passed as a path parameter.

---

## Parking Spots Page

### `useGetParkingSpots`

| Detail | Value |
|---|---|
| **Hook** | `useGetParkingSpots` |
| **Method** | `GET` |
| **Endpoint** | `parking-spot/get/all` |
| **Response** | `ParkingSpotResponse[]` |

```typescript
interface ParkingSpotResponse extends Base {
  slotNumber: string;
  occupiedBy: string | null;
  status: ParkingSpotStatus;
}

type ParkingSpotStatus = "Available" | "Occupied" | "OccupiedByMe";
```

### `useReserveParkingSpot`

| Detail | Value |
|---|---|
| **Hook** | `useReserveParkingSpot` |
| **Method** | `POST` |
| **Endpoint** | `parking-spot/reserve` |
| **Request Body** | `ReserveParkingSpotRequest` |

```typescript
interface ReserveParkingSpotRequest {
  parkingSpotId: number;
  vehicleRegistrationNumber: string;
  startTime: Date;
  endTime: Date;
}
```

### `useCancelReservation`

| Detail | Value |
|---|---|
| **Hook** | `useCancelReservation` |
| **Method** | `POST` |
| **Endpoint** | `parking-spot/cancel/{parkingSpotId}` |

No request body. The parking spot ID is passed as a path parameter.

---

## Bookings Page

The Bookings page currently uses **static dummy data** from `Utils/data.ts` and has no API hook. The following hook and endpoint are needed:

### `useGetBookings` *(not yet created)*

| Detail | Value |
|---|---|
| **Hook** | `useGetBookings` |
| **Method** | `GET` |
| **Endpoint** | `booking/get/user-bookings` |
| **Response** | `Booking[]` |

```typescript
interface Booking extends Base {
  vehicle: string;
  parkingSpot: string;
  startTime: Date;
  endTime: Date;
  isCancelled: boolean;
}
```

---

## Shared Base Interface

All response objects extend the `Base` interface:

```typescript
interface Base {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
}
```
