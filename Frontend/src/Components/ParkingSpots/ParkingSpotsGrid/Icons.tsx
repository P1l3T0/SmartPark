import type { ParkingSpotStatus, ParkingSpotConfig } from "../../../Utils/interfaces";

const AvailableIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
    />
  </svg>
);

const CarIcon = () => (
  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z" />
    <circle cx="7.5" cy="14.5" r="1.5" />
    <circle cx="16.5" cy="14.5" r="1.5" />
  </svg>
);

const KeyIcon = () => (
  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
  </svg>
);

const statusConfig: Record<ParkingSpotStatus, ParkingSpotConfig> = {
  Available: {
    border: "border-success",
    bg: "bg-success/10",
    text: "text-success",
    dot: "bg-success",
    label: (_occupiedBy: string | null) => "Available",
    icon: <AvailableIcon />,
  },
  OccupiedByMe: {
    border: "border-primary",
    bg: "bg-primary/10",
    text: "text-primary",
    dot: "bg-primary",
    label: (_occupiedBy: string | null) => "My Vehicle",
    icon: <KeyIcon />,
  },
  Occupied: {
    border: "border-error",
    bg: "bg-error/10",
    text: "text-error",
    dot: "bg-error",
    label: (occupiedBy: string | null) => occupiedBy ?? "Occupied",
    icon: <CarIcon />,
  },
};

export { AvailableIcon, CarIcon, KeyIcon, statusConfig };