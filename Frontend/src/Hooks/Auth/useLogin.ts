import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginEndPoint } from "../../Utils/endpoints";
import type { LoginDto } from "../../Utils/interfaces";
//import useAuth from "../../Context/Auth/useAuth";

const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  //const { login } = useAuth();

  const [user, setUser] = useState<LoginDto>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async () => {
    alert(JSON.stringify(user));
    navigate("/home");
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
    mutationFn: loginUser
  });

  const handleSubmit = async () => mutateAsync();

  return { handleChange, handleSubmit };
};

export default useLogin;