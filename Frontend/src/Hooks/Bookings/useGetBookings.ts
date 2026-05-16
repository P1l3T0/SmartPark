import { AxiosError, type AxiosResponse } from "axios";
import api from "../../Utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { getBookingsEndPoint } from "../../Utils/endpoints";
import type { BookingResponse } from "../../Utils/interfaces";

const useGetBookings = () => {
  const getBookings = async (): Promise<BookingResponse[]> => {
    return await api
      .get<BookingResponse[]>(getBookingsEndPoint, { withCredentials: true })
      .then((res: AxiosResponse<BookingResponse[]>) => {
        return res.data.map((booking) => ({
          ...booking,
          startTime: new Date(booking.startTime),
          endTime: new Date(booking.endTime),
        }));
      })
      .catch((err: AxiosError) => {
        console.error(err);
        return [];
      });
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  const bookings = data ?? [];
  const total = bookings.length;
  const active = bookings.filter((b) => !b.isCancelled).length;
  const cancelled = bookings.filter((b) => b.isCancelled).length;

  return { bookings, total, active, cancelled, isLoading, isError };
};

export default useGetBookings;