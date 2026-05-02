import { useState } from "react";
import { AxiosError } from "axios";
import type {
  CheckboxChangeEvent,
  MaskedTextBoxChangeEvent,
  TextBoxChangeEvent,
} from "@progress/kendo-react-inputs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { VehicleRequest, VehicleResponse } from "../../Utils/interfaces";
import { updateVehicleEndPoint } from "../../Utils/endpoints";
import type { DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";
import api from "../../Utils/axiosInstance";

const useUpdateVehicle = (vehicle: VehicleResponse) => {
  const queryClient = useQueryClient();

  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [updatedVehicle, setUpdatedVehicle] = useState<VehicleRequest>({
    registrationNumber: vehicle.registrationNumber ?? "",
    model: vehicle.model ?? "",
    brand: vehicle.brand ?? "",
    isPrimary: vehicle.isPrimary ?? false,
    isUpdating: true,
  });

  const toggleDialog = () => {
    setVisible((prev) => !prev);
  };

  const toggleErrorDialog = () => {
    setDialogVisible((prev) => !prev);
  };

  const handleDropDownChange = (e: DropDownListChangeEvent) => {
    const name: string = e.target.props.name as string;
    const value: string = e.target.value as string;

    setUpdatedVehicle({
      ...updatedVehicle,
      [name]: value,
    });
  };

  const handleInputChange = (e: TextBoxChangeEvent | MaskedTextBoxChangeEvent) => {
    const { name, value } = e.target;

    setUpdatedVehicle({
      ...updatedVehicle,
      [name as string]: value,
    });
  };

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    const { name, value } = e.target;

    setUpdatedVehicle({
      ...updatedVehicle,
      [name as string]: value,
    });
  };

  const updateVehicle = async () => {
    await api
      .put<VehicleRequest>(
        `${updateVehicleEndPoint}/${vehicle.id}`,
        updatedVehicle,
        { withCredentials: true },
      )
      .catch((err: AxiosError) => {
        setError(err.response?.data as string || "An error occurred");
        toggleErrorDialog();
      });
  };

  const { mutateAsync } = useMutation({
    mutationFn: updateVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-vehicles"] });
    },
  });

  const handleUpdate = async () => {
    await mutateAsync();
  };

  return {
    visible,
    toggleDialog,
    dialogVisible,
    toggleErrorDialog,
    error,
    handleDropDownChange,
    handleInputChange,
    handleCheckboxChange,
    handleUpdate,
  };
};

export default useUpdateVehicle;