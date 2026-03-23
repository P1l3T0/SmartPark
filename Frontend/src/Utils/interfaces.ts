interface Base {
  id: number;
  dateCreated: Date;
}

// Auth
export interface RegisterDto {
  email: string;
  username: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface VehicleDto {
  brand: string;
  model: string;
  registrationNumber: string;
  isPrimary: boolean;
}

export interface User extends Base {
  email: string;
  username: string;
}

export interface Vehicle extends Base {
  brand: string;
  model: string;
  registrationNumber: string;
  isPrimary: boolean;
}