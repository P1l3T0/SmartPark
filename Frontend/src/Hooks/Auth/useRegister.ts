import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { registerEndPoint } from "../../Utils/endpoints";
import type { RegisterDto } from "../../Utils/interfaces";
//import useAuth from "../../Context/Auth/useAuth";

const useRegister = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  //const { login } = useAuth();

  const [user, setUser] = useState<RegisterDto>({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async () => {
    alert(JSON.stringify(user));
    navigate("/home");
    //await axios
    //  .post(registerEndPoint, user, { withCredentials: true })
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
    mutationFn: registerUser
  });

  const handleSubmit = async () => mutateAsync();

  return { handleChange, handleSubmit };
};

export default useRegister;