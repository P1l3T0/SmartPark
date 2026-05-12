import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import api from "../../Utils/axiosInstance";
import { cancelReservationEndPoint } from "../../Utils/endpoints";

const useCancelReservation = () => {
  const queryClient = useQueryClient();

  const [visible, setVisible] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const toggleDialog = () => {
    setVisible((prev) => !prev);
    if (visible) {
      setError("");
    }
  };

  const cancelReservation = async (parkingSpotId: number) => {
    await api
      .post(`${cancelReservationEndPoint}/${parkingSpotId}`, {}, { withCredentials: true })
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["parking-spots"] });
      })
      .catch((err: AxiosError) => {
        setError((err.response?.data as string) || "An error occurred");
        setVisible(true);
      });
  };

  const { mutateAsync } = useMutation({
    mutationFn: cancelReservation,
  });

  const handleCancelReservation = async (parkingSpotId: number) => {
    await mutateAsync(parkingSpotId);
  };

  return { handleCancelReservation, visible, error, toggleDialog };
};

export default useCancelReservation;
