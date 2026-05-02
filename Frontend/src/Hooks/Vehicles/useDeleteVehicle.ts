import { AxiosError } from "axios";
import api from "../../Utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVehicleEndPoint } from "../../Utils/endpoints";
import { useState } from "react";

const useDeleteVehicle = () => {
  const queryClient = useQueryClient();

  const [visible, setVisible] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const toggleDialog = () => {
    setVisible((prev) => !prev);
  };

  const deleteVehicle = async (vehicleId: number) => {
    await api
      .delete(`${deleteVehicleEndPoint}/${vehicleId}`, { withCredentials: true })
      .catch((err: AxiosError) => {
        setError((err.response?.data as string) || "An error occurred");
        setVisible(true);
      });
  };

  const { mutateAsync } = useMutation({
    mutationFn: deleteVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-vehicles"] });
    },
  });

  const handleClick = async (vehicleId: number) => {
    await mutateAsync(vehicleId);
  };

  return { handleClick, visible, error, toggleDialog };
};

export default useDeleteVehicle;