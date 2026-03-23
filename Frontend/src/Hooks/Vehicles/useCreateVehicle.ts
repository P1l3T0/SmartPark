import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";
import type { Vehicle } from "../../Utils/interfaces";
import type { TextBoxChangeEvent } from "@progress/kendo-react-inputs";

const useCreateVehicle = (onVehicleAdded: () => void) => {
  const queryClient = useQueryClient();

  const [vehicle, setVehicle] = useState<Vehicle>({
    id: 0,
    dateCreated: new Date(),
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

  const handleInputChange = (e: TextBoxChangeEvent) => {
    const { name, value } = e.target;

    setVehicle({
      ...vehicle,
      [name as string]: value,
    });
  };

  const createVehicle = async () => {
    const existing = localStorage.getItem("vehicles");
    const vehicles: Vehicle[] = existing ? JSON.parse(existing) : [];
    vehicles.push({
      ...vehicle,
      id: vehicles.length + 1,
    });
    localStorage.setItem("vehicles", JSON.stringify(vehicles));
    onVehicleAdded();

    //await axios
    //  .post(loginEndPoint, user, { withCredentials: true })
    //  .then(() => {
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

export default useCreateVehicle;