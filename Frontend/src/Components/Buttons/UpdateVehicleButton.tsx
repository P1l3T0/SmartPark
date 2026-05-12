import { Button } from "@progress/kendo-react-buttons";
import UpdateWindow from "../Vehicles/Components/Layout/UpdateWindow";
import useUpdateVehicle from "../../Hooks/Vehicles/useUpdateVehicle";
import type { VehicleResponse } from "../../Utils/interfaces";
import ErrorDialog from "../Common/ErrorDialog";

interface UpdateVehicleButtonProps {
  vehicle: VehicleResponse;
}

const UpdateVehicleButton = ({ vehicle }: UpdateVehicleButtonProps) => {
  const {
    visible,
    toggleDialog,
    handleDropDownChange,
    handleInputChange,
    handleCheckboxChange,
    handleUpdate,
    dialogVisible,
    toggleErrorDialog,
    error,
  } = useUpdateVehicle(vehicle);

  return (
    <>
      <Button icon={"pencil"} themeColor="primary" onClick={toggleDialog} />
      <ErrorDialog visible={dialogVisible} toggleDialog={toggleErrorDialog} error={error} />

      {visible && (
        <UpdateWindow
          vehicle={vehicle}
          toggleDialog={toggleDialog}
          handleUpdate={handleUpdate}
          handleInputChange={handleInputChange}
          handleCheckboxChange={handleCheckboxChange}
          handleDropDownChange={handleDropDownChange}
        />
      )}
    </>
  );
};

export default UpdateVehicleButton;
