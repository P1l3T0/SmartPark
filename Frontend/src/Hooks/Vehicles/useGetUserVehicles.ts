import { AxiosError, type AxiosResponse } from "axios";
import api from "../../Utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { getUserVehiclesEndPoint } from "../../Utils/endpoints";
import type { VehicleResponse } from "../../Utils/interfaces";

const useGetUserVehicles = () => {
  const getUserVehicles = async (): Promise<VehicleResponse[] | void> => {
    return await api
      .get<VehicleResponse[]>(`${getUserVehiclesEndPoint}`, { withCredentials: true })
      .then((res: AxiosResponse<VehicleResponse[]>) => {
        return res.data.map((vehicle) => ({
          ...vehicle,
          createdDate: new Date(vehicle.createdDate),
          lastModifiedDate: new Date(vehicle.lastModifiedDate),
        }));
      })
      .catch((err: AxiosError) => {
        console.error(err);
        return [];
      });
  };

  const vehicleQuery = useQuery({
    queryKey: ["user-vehicles"],
    queryFn: getUserVehicles,
  });

  const { data, isLoading, isError } = vehicleQuery;

  return { data, isLoading, isError };
};

export default useGetUserVehicles;