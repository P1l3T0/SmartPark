import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerEndPoint } from "../../Utils/endpoints";
import type { UserRequest } from "../../Utils/interfaces";
import type { TextBoxChangeEvent } from "@progress/kendo-react-inputs";
//import useAuth from "../../Context/Auth/useAuth";

const useRegister = (onRegistered: () => void) => {
  //const { login } = useAuth();

  const [user, setUser] = useState<UserRequest>({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e: TextBoxChangeEvent) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name as string]: value,
    });
  };

  const registerUser = async () => {
    await axios
      .post(registerEndPoint, user)
      .then(() => {
        localStorage.setItem("email", user.email);
        onRegistered();
      })
      .catch((err: AxiosError) => {
        const error = err.response?.data as { title?: string };
        alert(error?.title);
      });
  };

  const { mutateAsync } = useMutation({
    mutationFn: registerUser
  });

  const handleSubmit = async () => mutateAsync();

  return { handleChange, handleSubmit };
};

export default useRegister;