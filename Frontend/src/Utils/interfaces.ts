interface Base {
  id: number;
  dateCreated: Date;
}

// Auth

export interface UserRequest {
  email: string;
  username?: string;
  password: string;
}

interface UserResponse extends Base {
  email: string;
  username: string;
}

// Vehicle

export interface VehicleRequest {
  brand: string;
  model: string;
  registrationNumber: string;
  isPrimary: boolean;
}

export interface VehicleResponse extends Base {
  brand: string;
  model: string;
  registrationNumber: string;
  isPrimary: boolean;
}

export interface Booking extends Base {
  vehicle: string;
  parkingSpot: string;
  startTime: Date;
  endTime: Date;
  isCancelled: boolean;
}