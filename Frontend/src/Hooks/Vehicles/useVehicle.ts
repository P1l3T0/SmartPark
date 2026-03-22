import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";
import type { VehicleDto } from "../../Utils/interfaces";

const useVehicle = () => {
  const queryClient = useQueryClient();
  //const { login } = useAuth();

  const [vehicle, setVehicle] = useState<VehicleDto>({
    brand: "",
    model: "",
    registrationNumber: "",
    isPrimary: false,
  });

  const handleDropDownChange = (e: DropDownListChangeEvent) => {
    const name: string = e.target.props.name as string;
    const value: string = e.target.value as string;

    setVehicle({
      ...vehicle,
      [name]: value,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.name as string;
    const value: string = e.target.value as string;

    setVehicle({
      ...vehicle,
      [name]: value,
    });
  };

  const createVehicle = async () => {
    const existing = localStorage.getItem("vehicles");
    const vehicles: VehicleDto[] = existing ? JSON.parse(existing) : [];
    vehicles.push(vehicle);
    localStorage.setItem("vehicles", JSON.stringify(vehicles));

    //await axios
    //  .post(loginEndPoint, user, { withCredentials: true })
    //  .then(() => {
    //    //login();
    //    navigate("/home");
    //    queryClient.invalidateQueries({ queryKey: ["user"] });
    //  })
    //  .catch((err: AxiosError) => {
    //    const error = err.response?.data as { title?: string };
    //    alert(error?.title);
    //  });
  };

  const { mutateAsync } = useMutation({
    mutationFn: createVehicle,
  });

  const handleSubmit = async () => mutateAsync();

  return { handleInputChange, handleDropDownChange, handleSubmit };
};

export default useVehicle;
