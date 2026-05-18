import { useState } from "react";
import useCancelReservation from "./useCancelReservation";

interface CancelConfirmState {
  visible: boolean;
  bookingId: number | null;
  slotNumber: string;
}

const useCancelConfirm = () => {
  const { handleCancelReservation, visible: errorVisible, error, toggleDialog: toggleErrorDialog } = useCancelReservation();
  const [cancelConfirm, setCancelConfirm] = useState<CancelConfirmState>({ visible: false, bookingId: null, slotNumber: "" });

  const openCancelConfirm = (bookingId: number, slotNumber: string) => {
    setCancelConfirm({ visible: true, bookingId, slotNumber });
  };

  const closeCancelConfirm = () => {
    setCancelConfirm({ visible: false, bookingId: null, slotNumber: "" });
  };

  const confirmCancel = async () => {
    if (cancelConfirm.bookingId != null) {
      await handleCancelReservation(cancelConfirm.bookingId);
    }
    closeCancelConfirm();
  };

  return {
    cancelConfirm,
    openCancelConfirm,
    closeCancelConfirm,
    confirmCancel,
    errorVisible,
    error,
    toggleErrorDialog,
  };
};

export default useCancelConfirm;
