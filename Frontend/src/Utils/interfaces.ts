import type { JSX } from "react/jsx-runtime";

interface Base {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
}

export interface CustomError {
  detail: string;
  instance: string;
  status: number;
  title: string;
  type: string;
  message: string;
  path: string;
}

// Auth

export interface AuthState {
  username?: string;
  accessToken?: string;
  refreshToken?: string;
}

// #region Context

export interface AuthContextType {
  auth: AuthState;
  isUserLoggedIn: boolean;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
  login: () => void;
  logout: () => void;
}

export interface LoginRequest {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface UserRequest {
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  imageUrl?: string;
  activated?: boolean;
  langKey?: string;
  authorities?: string[];
}

export interface UserResponse extends Base {
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  activated: boolean;
  langKey: string;
  createdBy: string;
  lastModifiedBy: string;
  authorities: string[];
}

// Vehicle

export interface VehicleRequest {
  brand: string;
  model: string;
  registrationNumber: string;
  isPrimary: boolean;
  isUpdating?: boolean;
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

export interface ParkingSpotResponse extends Base {
  slotNumber: string;
  occupiedBy: string | null;
  status: ParkingSpotStatus;
}

export type ParkingSpotStatus = "Available" | "Occupied" | "OccupiedByMe";

export interface ParkingSpotConfig {
  bg: string;
  icon: JSX.Element;
  label?: string;
  value?: string | number;
  color?: string;
  border?: string;
  text?: string;
  dot?: string;
}

export interface ReserveParkingSpotRequest {
  parkingSpotId: number;
  vehicleRegistrationNumber: string;
  startTime: Date;
  endTime: Date;
}