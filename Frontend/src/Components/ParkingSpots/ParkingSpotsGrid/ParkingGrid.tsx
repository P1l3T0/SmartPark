import useGetParkingSpots from "../../../Hooks/ParkingSpots/useGetParkingSpots";
import ParkingSpot from "./ParkingSpot";

const ParkingGrid = () => {
  const { COLS, ROWS, parkingSpots } = useGetParkingSpots();

  return (
    <div className="flex flex-col gap-3">
      {ROWS.map((row, rowIdx) => {
        const rowSpots = parkingSpots.slice(
          rowIdx * COLS.length,
          (rowIdx + 1) * COLS.length,
        );
        const isLastRow = rowIdx === ROWS.length - 1;

        return (
          <div key={row}>
            <div className="flex gap-2 mb-2">
              <span className="text-xs font-bold text-text-tertiary w-6 h-6 flex items-center justify-center rounded-full bg-elevated shrink-0">
                {row}
              </span>
            </div>

            <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {rowSpots.map((spot) => (
                <ParkingSpot key={spot.id} {...spot} />
              ))}
            </div>

            {!isLastRow && rowIdx % 2 === 1 && (
              <div className="flex items-center gap-2 mt-4 mb-1">
                <div className="flex-1 h-px bg-divider" />
                <span className="text-sm text-text-tertiary px-2 whitespace-nowrap">
                  Driving Lane
                </span>
                <div className="flex-1 h-px bg-divider" />
              </div>
            )}

          </div>
        );
      })}
    </div>
  );
} 

export default ParkingGrid;

