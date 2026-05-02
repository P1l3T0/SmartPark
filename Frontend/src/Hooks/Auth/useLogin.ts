import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginEndPoint } from "../../Utils/endpoints";
import type { LoginRequest, LoginResponse } from "../../Utils/interfaces";
import type { CheckboxChangeEvent, TextBoxChangeEvent } from "@progress/kendo-react-inputs";
import useAuth from "../../Context/Auth/useAuth";

const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { login, setAuth } = useAuth();

  const [user, setUser] = useState<LoginRequest>({
    username: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e: TextBoxChangeEvent | CheckboxChangeEvent) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name as string]: value,
    });
  };

  const loginUser = async () => {
    await axios
      .post<LoginResponse>(loginEndPoint, user)
      .then((res) => {
        setAuth({
          username: user.username,
          accessToken: res.data.access_token,
          refreshToken: res.data.refresh_token,
        });
        document.cookie = `token=${res.data.access_token}; path=/;`;
        login();
        navigate("/home");
        queryClient.invalidateQueries({ queryKey: ["user"] });
      })
      .catch((err: AxiosError) => {
        const error = err.response?.data as { title?: string };
        alert(error?.title);
      });
  };

  const { mutateAsync } = useMutation({
    mutationFn: loginUser,
  });

  const handleSubmit = async () => mutateAsync();

  return { handleChange, handleSubmit };
};

export default useLogin;