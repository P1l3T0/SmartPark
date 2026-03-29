import { useState } from "react";
import type { ParkingSpotResponse, ParkingSpotStatus} from "../../Utils/interfaces";

const MY_SPOT_ID = 2;

const useGetParkingSpots = () => {
  const ROWS = ["A", "B", "C", "D"];
  const COLS = [1, 2, 3, 4, 5, 6];

  const [parkingSpots] = useState<ParkingSpotResponse[]>(() => {
    let id = 1;
    const spots: ParkingSpotResponse[] = [];

    for (const row of ROWS) {
      for (const col of COLS) {
        const currentId = id++;
        const status: ParkingSpotStatus =
          currentId === MY_SPOT_ID
            ? "OccupiedByMe"
            : currentId % 2 === 0
              ? "Available"
              : "Occupied";

        spots.push({
          id: currentId,
          dateCreated: new Date(),
          name: `${row}${col}`,
          slotNumber: `${row}${col}`,
          occupiedBy: status === "Occupied" ? `User${currentId}` : null,
          status,
        });
      }
    }

    return spots;
  });

  return { COLS, ROWS, parkingSpots };
};

export default useGetParkingSpots;