import type { JSX } from "react/jsx-runtime";

interface Base {
  id: number;
  dateCreated: Date;
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

export interface UserRequest {
  email: string;
  username?: string;
  password: string;
}

export interface VerificationRequest {
  email: string;
  verificationCode?: string;
}

export interface UserResponse extends Base {
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