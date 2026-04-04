import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginEndPoint } from "../../Utils/endpoints";
import type { UserRequest } from "../../Utils/interfaces";
import type { TextBoxChangeEvent } from "@progress/kendo-react-inputs";
//import useAuth from "../../Context/Auth/useAuth";

const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  //const { login } = useAuth();

  const [user, setUser] = useState<UserRequest>({
    email: "",
    password: "",
  });

  const handleChange = (e: TextBoxChangeEvent) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name as string]: value,
    });
  };

  const loginUser = async () => {
    await axios
      .post(loginEndPoint, user)
      .then((res) => {
        document.cookie = `token=${res.data.token}; path=/;`;
        //login();
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