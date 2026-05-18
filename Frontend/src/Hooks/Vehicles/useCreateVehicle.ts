import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";
import type { VehicleRequest } from "../../Utils/interfaces";
import type { TextBoxChangeEvent } from "@progress/kendo-react-inputs";
import type { AxiosError } from "axios";
import api from "../../Utils/axiosInstance";
import { createVehicleEndPoint } from "../../Utils/endpoints";

const useCreateVehicle = () => {
  const queryClient = useQueryClient();

  const [visible, setVisible] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [vehicle, setVehicle] = useState<VehicleRequest>({
    brand: "",
    model: "",
    registrationNumber: "",
    isPrimary: false,
  });

  const toggleDialog = () => {
    setVisible((prev) => !prev);
  };

  const handleDropDownChange = (e: DropDownListChangeEvent) => {
    const name: string = e.target.props.name as string;
    const value: string = e.target.value as string;

    setVehicle({
      ...vehicle,
      [name]: value,
    });
  };

  const handleInputChange = (e: TextBoxChangeEvent) => {
    const { name, value } = e.target;

    setVehicle({
      ...vehicle,
      [name as string]: value,
    });
  };

  const createVehicle = async () => {
    await api
      .post(createVehicleEndPoint, vehicle, { withCredentials: true });
  };

  const { mutateAsync } = useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-vehicles"] });
    },
    onError: (err: AxiosError) => {
      setError((err.response?.data as string) || "An error occurred");
      setVisible(true);
    },
  });

  const handleSubmit = async () => mutateAsync();

  return { handleInputChange, handleDropDownChange, handleSubmit, visible, error, toggleDialog };
};

export default useCreateVehicle;