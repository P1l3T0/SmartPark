import { AxiosError, type AxiosResponse } from "axios";
import api from "../../Utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { getParkingSpotsEndPoint } from "../../Utils/endpoints";
import type { ParkingSpotResponse } from "../../Utils/interfaces";

const useGetParkingSpots = () => {
  const ROWS = ["A", "B", "C", "D"];
  const COLS = [1, 2, 3, 4, 5, 6];

  const getParkingSpots = async (): Promise<ParkingSpotResponse[]> => {
    const startDate = new Date();

    return await api
      .get<ParkingSpotResponse[]>(getParkingSpotsEndPoint, {
        params: { startDate },
        withCredentials: true,
      })
      .then((res: AxiosResponse<ParkingSpotResponse[]>) => res.data)
      .catch((err: AxiosError) => {
        console.error(err);
        return [];
      });
  };

  const parkingSpotsQuery = useQuery({
    queryKey: ["parking-spots"],
    queryFn: getParkingSpots,
  });

  const { data: parkingSpots, isLoading, isError } = parkingSpotsQuery;

  return { COLS, ROWS, parkingSpots: parkingSpots ?? [], isLoading, isError };
};

export default useGetParkingSpots;