import { AxiosError, type AxiosResponse } from "axios";
import api from "../../Utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUserEndPoint } from "../../Utils/endpoints";
import type { UserResponse } from "../../Utils/interfaces";

const useGetUser = () => {
  const getUser = async (): Promise<UserResponse | void> => {
    return await api
      .get<UserResponse>(getCurrentUserEndPoint)
      .then((res: AxiosResponse<UserResponse>) => res.data)
      .catch((err: AxiosError) => {
        console.error(err);
      });
  };

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: getUser
  });

  const { data, isLoading, isError } = userQuery;

  return { data, isLoading, isError };
};

export default useGetUser;