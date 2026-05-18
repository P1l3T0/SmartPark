import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList, type DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";
import { DateTimePicker, type DateTimePickerChangeEvent } from "@progress/kendo-react-dateinputs";
import { Label } from "@progress/kendo-react-labels";
import type { ReserveParkingSpotRequest } from "../../../../Utils/interfaces";

interface ReservationWindowProps {
  reservation: ReserveParkingSpotRequest;
  vehicleRegistrationNumbers: string[];
  toggleDialog: () => void;
  handleSubmit: () => void;
  handleDropDownChange: (e: DropDownListChangeEvent) => void;
  handleStartTimeChange: (e: DateTimePickerChangeEvent) => void;
  handleEndTimeChange: (e: DateTimePickerChangeEvent) => void;
}

const ReservationWindow = ({
  reservation,
  vehicleRegistrationNumbers,
  toggleDialog,
  handleSubmit,
  handleDropDownChange,
  handleStartTimeChange,
  handleEndTimeChange,
}: ReservationWindowProps) => {
  return (
    <Dialog title={`Reserve Parking Spot ${reservation.parkingSpotId}`} onClose={toggleDialog}>
      <form className="space-y-3 p-2">
        <div className="space-y-2">
          <div>
            <Label className="text-sm font-medium text-text-secondary">Vehicle Registration Number</Label>
            <DropDownList
              id="vehicleRegistrationNumber"
              name="vehicleRegistrationNumber"
              data={vehicleRegistrationNumbers}
              value={reservation.vehicleRegistrationNumber || undefined}
              onChange={handleDropDownChange}
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-text-secondary">Start Time</Label>
            <DateTimePicker
              id="startTime"
              name="startTime"
              min={new Date()}
              max={new Date(new Date().setDate(new Date().getDate() + 1))}
              value={reservation.startTime}
              onChange={handleStartTimeChange}
              format="dd/MM/yyyy HH:mm"
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-text-secondary">End Time</Label>
            <DateTimePicker
              id="endTime"
              name="endTime"
              min={new Date()}
              max={new Date(new Date().setDate(new Date().getDate() + 1))}
              value={reservation.endTime}
              onChange={handleEndTimeChange}
              format="dd/MM/yyyy HH:mm"
            />
          </div>
        </div>
      </form>
      <DialogActionsBar>
        <Button type="button" themeColor="primary" onClick={handleSubmit}>Reserve</Button>
        <Button type="button" themeColor="error" onClick={toggleDialog}>Cancel</Button>
      </DialogActionsBar>
    </Dialog>
  );
};

export default ReservationWindow;
