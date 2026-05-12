import type { VerificationRequest } from "../../Utils/interfaces";
import axios, { AxiosError } from "axios";
import { resendVerificationCodeEndPoint } from "../../Utils/endpoints";
import { useMutation } from "@tanstack/react-query";

const useResendVerificationCode = () => {
  const verificationRequest: VerificationRequest = {
    email: localStorage.getItem("email") || ""
  }

  const resendVerificationCode = async () => {
    await axios
      .post(resendVerificationCodeEndPoint, verificationRequest)
      .catch((err: AxiosError) => {
        const error = err.response?.data as { title?: string };
        alert(error?.title);
      });
  };

  const { mutateAsync } = useMutation({
    mutationFn: resendVerificationCode,
  });

  const handleResendVerificationCode = async () => mutateAsync();

  return { handleResendVerificationCode };
}

export default useResendVerificationCode