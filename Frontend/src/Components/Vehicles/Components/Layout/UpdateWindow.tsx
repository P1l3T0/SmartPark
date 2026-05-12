import { Button } from "@progress/kendo-react-buttons";
import { Window } from "@progress/kendo-react-dialogs";
import { Checkbox, MaskedTextBox, TextBox, type CheckboxChangeEvent, type MaskedTextBoxChangeEvent, type TextBoxChangeEvent } from "@progress/kendo-react-inputs";
import { DropDownList, type DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";
import type { VehicleResponse } from "../../../../Utils/interfaces";
import { Label } from "@progress/kendo-react-labels";
import { carBrands } from "../../../../Utils/data";

interface UpdateWindowProps {
  vehicle: VehicleResponse;
  toggleDialog: () => void;
  handleUpdate: () => void;
  handleInputChange: (e: TextBoxChangeEvent | MaskedTextBoxChangeEvent) => void;
  handleDropDownChange: (e: DropDownListChangeEvent) => void;
  handleCheckboxChange: (e: CheckboxChangeEvent) => void;
}

const UpdateWindow = ({ vehicle, toggleDialog, handleInputChange, handleDropDownChange, handleCheckboxChange, handleUpdate }: UpdateWindowProps) => {
  return (
    <>
      <Window title="Update Profile" onClose={toggleDialog} initialHeight={400}>
        <form className="space-y-3">
          <div className="space-y-2">
            <div>
              <Label className="text-sm font-medium text-text-secondary">Brand</Label>
              <DropDownList id="brand" name="brand" data={Object.keys(carBrands)} defaultValue={vehicle?.brand} onChange={handleDropDownChange} />
            </div>
            <div>
              <Label className="text-sm font-medium text-text-secondary">Model</Label>
              <TextBox id="model" type="text" name="model" autoComplete="off" defaultValue={vehicle?.model} onChange={handleInputChange} />
            </div>
            <div>
              <Label className="text-sm font-medium text-text-secondary">Registration Number</Label>
              <MaskedTextBox id="registrationNumber" name="registrationNumber" mask="LL 0000 LL" defaultValue={vehicle?.registrationNumber} onChange={handleInputChange} />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="isPrimary" name="isPrimary" defaultChecked={vehicle?.isPrimary} onChange={handleCheckboxChange} />
              <Label className="text-sm font-medium text-text-secondary">Primary Vehicle</Label>
            </div>
          </div>
          <div className="flex justify-center gap-2 pt-5">
            <Button type="button" themeColor="primary" className="w-full" onClick={handleUpdate}>Update</Button>
            <Button type="button" themeColor="error" className="w-full" onClick={toggleDialog}>Cancel</Button>
          </div>
        </form>
      </Window>
    </>
  );
};

export default UpdateWindow;