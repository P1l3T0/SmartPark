import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import api from "../../Utils/axiosInstance";
import { cancelBookingEndPoint } from "../../Utils/endpoints";

const useCancelReservation = () => {
  const queryClient = useQueryClient();

  const [visible, setVisible] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const toggleDialog = () => {
    setVisible((prev) => !prev);
  };

  const cancelReservation = async (bookingId: number) => {
    await api
      .post(`${cancelBookingEndPoint}/${bookingId}/cancel`, {}, { withCredentials: true });
  };

  const { mutateAsync } = useMutation({
    mutationFn: cancelReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parking-spots"] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err: AxiosError) => {
      setError((err.response?.data as string) || "An error occurred");
      setVisible(true);
    },
  });

  const handleCancelReservation = async (bookingId: number) => {
    await mutateAsync(bookingId);
  };

  return { handleCancelReservation, visible, error, toggleDialog };
};

export default useCancelReservation;
