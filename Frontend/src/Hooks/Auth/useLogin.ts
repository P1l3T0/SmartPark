import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginEndPoint } from "../../Utils/endpoints";
import type { CustomError, LoginRequest, LoginResponse } from "../../Utils/interfaces";
import type { CheckboxChangeEvent, TextBoxChangeEvent } from "@progress/kendo-react-inputs";
import useAuth from "../../Context/Auth/useAuth";
import useRefreshToken from "./useRefreshToken";

const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { login, setAuth } = useAuth();
  const { scheduleRefresh } = useRefreshToken();

  const [visible, setVisible] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [user, setUser] = useState<LoginRequest>({
    username: "",
    password: "",
    rememberMe: false,
  });

  const toggleDialog = () => {
    setVisible((prev) => !prev);
  };

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
        document.cookie = `refresh_token=${res.data.refresh_token}; path=/;`;
        login();
        scheduleRefresh(res.data.access_token);
        navigate("/home");
        queryClient.invalidateQueries({ queryKey: ["user"] });
      })
      .catch((err: AxiosError) => {
        const error: CustomError = err.response?.data as CustomError;
        setError(error.detail || "An error occurred");
        setVisible(true);
      });
  };

  const { mutateAsync } = useMutation({
    mutationFn: loginUser,
  });

  const handleSubmit = async () => mutateAsync();

  return { handleChange, handleSubmit, visible, error, toggleDialog };
};

export default useLogin;