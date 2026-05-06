import { Button } from "@progress/kendo-react-buttons";
import useDeleteVehicle from "../../Hooks/Vehicles/useDeleteVehicle";
import type { VehicleResponse } from "../../Utils/interfaces";
import ErrorDialog from "../Common/ErrorDialog";

interface DeleteVehicleButtonProps {
  vehicle: VehicleResponse;
}

const DeleteVehicleButton = ({ vehicle }: DeleteVehicleButtonProps) => {
  const { handleClick, visible, error, toggleDialog } = useDeleteVehicle();
  const handleDelete = () => handleClick(vehicle.id);

  return (
    <>
      <Button icon={"trash"} themeColor="error" onClick={handleDelete} />
      <ErrorDialog visible={visible} error={error} toggleDialog={toggleDialog} />
    </>
  );
};

export default DeleteVehicleButton;