import type { ParkingSpotStatus } from "../../../Utils/interfaces";
import { statusConfig } from "./Icons";

interface ParkingSpotProps {
  slotNumber: string;
  occupiedBy: string | null;
  status: ParkingSpotStatus;
}

const ParkingSpot = ({ slotNumber, occupiedBy, status }: ParkingSpotProps) => {
  const config = statusConfig[status];
  const label = (config.label as (o: string | null) => string)(occupiedBy);

  return (
    <div
      title={`${slotNumber} — ${label}`}
      className={`flex flex-col items-center justify-between rounded-xl p-3 pt-2 cursor-pointer select-none transition-all duration-200 hover:scale-105 hover:shadow-md border-2 min-h-25 ${config.border} ${config.bg}`}
    >
      <div className="flex w-full justify-between items-center">
        <span className={`text-xs font-bold ${config.text}`}>{slotNumber}</span>
        <div className={`w-2 h-2 rounded-full ${config.dot}`} />
      </div>
      <div className={`${config.text} my-1`}>{config.icon}</div>
      <span className={`text-[10px] font-medium ${config.text} opacity-80 text-center leading-tight w-full truncate`}>
        {label}
      </span>
    </div>
  );
};

export default ParkingSpot;