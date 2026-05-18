import { forwardRef, useImperativeHandle } from "react";
import useReserveParkingSpot from "../../../../Hooks/ParkingSpots/useReserveParkingSpot";
import ReservationWindow from "./ReservationWindow";

interface ParkingReservationDialogProps {
  vehicleRegistrationNumbers: string[];
}

export interface ParkingReservationDialogHandle {
  open: (parkingSpotId: number) => void;
}

const ReservationDialog = forwardRef<ParkingReservationDialogHandle, ParkingReservationDialogProps>(
  ({ vehicleRegistrationNumbers }, ref) => {
    const {
      visible,
      reservation,
      toggleDialog,
      openReservationWindow,
      handleDropDownChange,
      handleStartTimeChange,
      handleEndTimeChange,
      handleSubmit,
    } = useReserveParkingSpot();

    useImperativeHandle(ref, () => ({
      open: openReservationWindow,
    }));

    if (!visible) return null;

    return (
      <ReservationWindow
        reservation={reservation}
        vehicleRegistrationNumbers={vehicleRegistrationNumbers}
        toggleDialog={toggleDialog}
        handleSubmit={handleSubmit}
        handleDropDownChange={handleDropDownChange}
        handleStartTimeChange={handleStartTimeChange}
        handleEndTimeChange={handleEndTimeChange}
      />
    );
  }
);

export default ReservationDialog;
