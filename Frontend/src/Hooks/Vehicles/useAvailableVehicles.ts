import type { ParkingSpotResponse } from "../../Utils/interfaces";
import useGetUserVehicles from "./useGetUserVehicles";

const useAvailableVehicles = (parkingSpots: ParkingSpotResponse[]) => {
  const { data: vehicles } = useGetUserVehicles();

  const occupiedByMe = new Set(
    parkingSpots
      .filter((s) => s.status === "OCCUPIED_BY_ME" && s.occupiedBy)
      .map((s) => s.occupiedBy as string)
  );

  const availableRegistrationNumbers = vehicles?.filter((v) => !occupiedByMe.has(v.registrationNumber)).map((v) => v.registrationNumber) ?? [];

  return availableRegistrationNumbers;
};

export default useAvailableVehicles;
