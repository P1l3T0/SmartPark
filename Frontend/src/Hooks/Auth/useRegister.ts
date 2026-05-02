import axios, { AxiosError, type AxiosResponse } from "axios";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { registerEndPoint } from "../../Utils/endpoints";
import type { CustomError, UserRequest, UserResponse } from "../../Utils/interfaces";
import type { TextBoxChangeEvent } from "@progress/kendo-react-inputs";

const useRegister = () => {
  const navigate = useNavigate();

  const [visible, setVisible] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState<UserRequest>({
    login: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const toggleDialog = () => {
    setVisible((prev) => !prev);
  };

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
      .then(() => navigate("/login"))
      .catch((err: AxiosError) => {
          const error: CustomError = err.response?.data as CustomError;
          setError(error.detail || "An error occurred");
          toggleDialog();
      });
  };

  const { mutateAsync } = useMutation({
    mutationFn: registerUser,
  });

  const handleSubmit = async () => mutateAsync();

  return { handleChange, handleSubmit, visible, error, toggleDialog };
};

export default useRegister;