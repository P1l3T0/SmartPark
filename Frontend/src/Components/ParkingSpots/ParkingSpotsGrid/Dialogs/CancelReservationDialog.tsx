import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";

interface CancelReservationDialogProps {
  visible: boolean;
  slotNumber: string;
  onConfirm: () => void;
  onClose: () => void;
}

const CancelReservationDialog = ({ visible, slotNumber, onConfirm, onClose }: CancelReservationDialogProps) => {
  return (
    <>
      {visible && (
        <Dialog title="Cancel Reservation" onClose={onClose}>
          <p className="m-5 text-center">
            Are you sure you want to cancel your reservation for spot <strong>{slotNumber}</strong>?
          </p>
          <DialogActionsBar>
            <Button themeColor="error" onClick={onConfirm}>Yes, cancel it</Button>
            <Button themeColor="base" onClick={onClose}>Keep it</Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </>
  );
};

export default CancelReservationDialog;
