import type { ParkingSpotStatus } from "../../../Utils/interfaces";
import { statusConfig } from "./Icons";

interface ParkingSpotProps {
  slotNumber: string;
  occupiedBy: string | null;
  status: ParkingSpotStatus;
}

const ParkingSpot = ({ slotNumber, occupiedBy, status }: ParkingSpotProps) => {
  const config = statusConfig[status];

  return (
    <div
      title={`${slotNumber}`}
      className={`flex flex-col items-center justify-between rounded-xl p-3 pt-2 cursor-pointer hover:scale-105 border-2 min-h-25 ${config.border} ${config.bg}`}
    >
      <div className="flex w-full justify-between items-center">
        <span className={`text-sm ${config.text}`}>{slotNumber}</span>
      </div>
      <div className={`${config.text} my-1`}>{config.icon}</div>
      <span className={`text-sm ${config.text} text-center`}>{occupiedBy}</span>
    </div>
  );
};

export default ParkingSpot;