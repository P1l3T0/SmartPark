import { Window } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList, type DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";
import { DateTimePicker, type DateTimePickerChangeEvent } from "@progress/kendo-react-dateinputs";
import { Label } from "@progress/kendo-react-labels";
import type { ReserveParkingSpotRequest } from "../../../Utils/interfaces";

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
    <Window title="Reserve Parking Spot" onClose={toggleDialog} initialHeight={380} initialWidth={450}>
      <form className="space-y-3">
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
              value={reservation.endTime}
              onChange={handleEndTimeChange}
              format="dd/MM/yyyy HH:mm"
            />
          </div>
        </div>
        <div className="flex justify-center gap-2 pt-5">
          <Button type="button" themeColor="primary" className="w-full" onClick={handleSubmit}>Reserve</Button>
          <Button type="button" themeColor="error" className="w-full" onClick={toggleDialog}>Cancel</Button>
        </div>
      </form>
    </Window>
  );
};

export default ReservationWindow;
