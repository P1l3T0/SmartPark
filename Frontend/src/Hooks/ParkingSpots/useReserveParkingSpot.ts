import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import api from "../../Utils/axiosInstance";
import { reserveParkingSpotEndPoint } from "../../Utils/endpoints";
import type { ReserveParkingSpotRequest } from "../../Utils/interfaces";
import type { DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";
import type { DateTimePickerChangeEvent } from "@progress/kendo-react-dateinputs";

const useReserveParkingSpot = () => {
  const queryClient = useQueryClient();

  const [visible, setVisible] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [reservation, setReservation] = useState<ReserveParkingSpotRequest>({
    parkingSpotId: 0,
    vehicleRegistrationNumber: "",
    startTime: new Date(),
    endTime: new Date(Date.now() + 60 * 60 * 1000),
  });

  const toggleDialog = () => {
    setVisible((prev) => !prev);
  };

  const openReservationWindow = (parkingSpotId: number) => {
    setReservation((prev) => ({ ...prev, parkingSpotId }));
    setVisible(true);
  };

  const handleDropDownChange = (e: DropDownListChangeEvent) => {
    setReservation((prev) => ({
      ...prev,
      vehicleRegistrationNumber: e.target.value as string,
    }));
  };

  const handleStartTimeChange = (e: DateTimePickerChangeEvent) => {
    if (e.value) {
      setReservation((prev) => ({
        ...prev,
        startTime: e.value as Date,
      }));
    }
  };

  const handleEndTimeChange = (e: DateTimePickerChangeEvent) => {
    if (e.value) {
      setReservation((prev) => ({
        ...prev,
        endTime: e.value as Date,
      }));
    }
  };

  const reserveParkingSpot = async () => {
    await api
      .post(reserveParkingSpotEndPoint, reservation, { withCredentials: true })
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["parking-spots"] });
        setVisible(false);
      })
      .catch((err: AxiosError) => {
        setError((err.response?.data as string) || "An error occurred");
      });
  };

  const { mutateAsync } = useMutation({
    mutationFn: reserveParkingSpot,
  });

  const handleSubmit = async () => mutateAsync();

  return {
    visible,
    error,
    reservation,
    toggleDialog,
    openReservationWindow,
    handleDropDownChange,
    handleStartTimeChange,
    handleEndTimeChange,
    handleSubmit,
  };
};

export default useReserveParkingSpot;
