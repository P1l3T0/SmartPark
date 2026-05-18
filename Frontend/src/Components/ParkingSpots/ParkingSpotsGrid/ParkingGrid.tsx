import { useRef } from "react";
import useGetParkingSpots from "../../../Hooks/ParkingSpots/useGetParkingSpots";
import useCancelConfirm from "../../../Hooks/ParkingSpots/useCancelConfirm";
import useAvailableVehicles from "../../../Hooks/Vehicles/useAvailableVehicles";
import ParkingSpot from "./ParkingSpot";
import { type ParkingReservationDialogHandle } from "./Dialogs/ReservationDialog";
import ErrorDialog from "../../Common/ErrorDialog";
import CancelReservationDialog from "./Dialogs/CancelReservationDialog";
import { ErrorComponent, LoaderComponent } from "../../Common/States";
import ReservationDialog from "./Dialogs/ReservationDialog";

const ParkingGrid = () => {
  const reservationDialogRef = useRef<ParkingReservationDialogHandle>(null);
  const { COLS, ROWS, parkingSpots, isLoading, isError } = useGetParkingSpots();
  const vehicleRegistrationNumbers = useAvailableVehicles(parkingSpots);
  const { cancelConfirm, openCancelConfirm, closeCancelConfirm, confirmCancel, errorVisible, error, toggleErrorDialog } = useCancelConfirm();

  if (isLoading) return <LoaderComponent />;
  if (isError) return <ErrorComponent />;

  return (
    <div className="flex flex-col gap-3">
      {ROWS.map((row, rowIdx) => {
        const rowSpots = parkingSpots.slice(rowIdx * COLS.length, (rowIdx + 1) * COLS.length);
        const isLastRow = rowIdx === ROWS.length - 1;

        return (
          <div key={row}>
            <div className="flex gap-2 mb-2">
              <span className="text-xs font-bold text-text-tertiary w-6 h-6 flex items-center justify-center rounded-full bg-elevated shrink-0">
                {row}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {rowSpots.map((spot) => (
                <ParkingSpot
                  key={spot.id}
                  slotNumber={spot.slotNumber}
                  occupiedBy={spot.occupiedBy}
                  status={spot.status}
                  onAvailableClick={() => reservationDialogRef.current?.open(spot.id)}
                  onCancelClick={() => openCancelConfirm(spot.bookingId!, spot.slotNumber)}
                />
              ))}
            </div>

            {!isLastRow && (
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

      <ErrorDialog visible={errorVisible} error={error} toggleDialog={toggleErrorDialog} />
      <ReservationDialog ref={reservationDialogRef} vehicleRegistrationNumbers={vehicleRegistrationNumbers} />
      <CancelReservationDialog visible={cancelConfirm.visible} slotNumber={cancelConfirm.slotNumber} onConfirm={confirmCancel} onClose={closeCancelConfirm} />
    </div>
  );
}

export default ParkingGrid;

