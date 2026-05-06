import useGetParkingSpots from "../../../Hooks/ParkingSpots/useGetParkingSpots";
import useReserveParkingSpot from "../../../Hooks/ParkingSpots/useReserveParkingSpot";
import useCancelReservation from "../../../Hooks/ParkingSpots/useCancelReservation";
import useGetUserVehicles from "../../../Hooks/Vehicles/useGetUserVehicles";
import ParkingSpot from "./ParkingSpot";
import ReservationWindow from "./ReservationWindow";
import ErrorDialog from "../../Common/ErrorDialog";

const ParkingGrid = () => {
  const { COLS, ROWS, parkingSpots } = useGetParkingSpots();
  const { data: vehicles } = useGetUserVehicles();
  const {
    visible,
    error: reserveError,
    reservation,
    toggleDialog,
    openReservationWindow,
    handleDropDownChange,
    handleStartTimeChange,
    handleEndTimeChange,
    handleSubmit,
  } = useReserveParkingSpot();
  const {
    handleCancelReservation,
    visible: cancelErrorVisible,
    error: cancelError,
    toggleDialog: toggleCancelErrorDialog,
  } = useCancelReservation();

  const vehicleRegistrationNumbers = vehicles?.map((v) => v.registrationNumber) ?? [];

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

            <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {rowSpots.map((spot) => (
                <ParkingSpot
                  key={spot.id}
                  {...spot}
                  onAvailableClick={() => openReservationWindow(spot.id)}
                  onCancelClick={() => handleCancelReservation(spot.id)}
                />
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

      {visible && (
        <ReservationWindow
          reservation={reservation}
          vehicleRegistrationNumbers={vehicleRegistrationNumbers}
          toggleDialog={toggleDialog}
          handleSubmit={handleSubmit}
          handleDropDownChange={handleDropDownChange}
          handleStartTimeChange={handleStartTimeChange}
          handleEndTimeChange={handleEndTimeChange}
        />
      )}

      <ErrorDialog visible={cancelErrorVisible} error={cancelError} toggleDialog={toggleCancelErrorDialog} />
      {reserveError && !visible && (
        <ErrorDialog visible={!!reserveError} error={reserveError} toggleDialog={toggleDialog} />
      )}
    </div>
  );
} 

export default ParkingGrid;

