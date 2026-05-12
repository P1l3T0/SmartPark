import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { verifyEndPoint } from "../../Utils/endpoints";
import type { InputChangeEvent } from "@progress/kendo-react-inputs";
import type { VerificationRequest } from "../../Utils/interfaces";

const useVerify = () => {
  const navigate = useNavigate();

  const [verificationCode, setVerificationCode] = useState<VerificationRequest>({
      email: localStorage.getItem("email") || "",
      verificationCode: ""
    },
  );

  const handleChange = (e: InputChangeEvent) => {
    setVerificationCode({
      ...verificationCode,
      verificationCode: e.value as string,
    });
  };

  const verifyUser = async () => {
    await axios
      .post(verifyEndPoint, verificationCode)
      .then(() => {
        navigate("/login");
        localStorage.removeItem("email");
      })
      .catch((err: AxiosError) => {
        const error = err.response?.data as { title?: string };
        alert(error?.title);
      });
  };

  const { mutateAsync } = useMutation({
    mutationFn: verifyUser,
  });

  const handleSubmit = async () => mutateAsync();

  return { handleChange, handleSubmit };
};

export default useVerify;
