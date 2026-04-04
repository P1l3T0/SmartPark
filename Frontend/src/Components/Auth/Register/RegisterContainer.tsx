import { useState } from "react";
import AuthForm from "../Form/AuthForm";
import RegisterForm from "./RegisterForm";
import VerificationForm from "./VerificationForm";

const RegisterContainer = () => {
  const [step, setStep] = useState<"register" | "verify">("register");

  return (
    <>
      <AuthForm>
        {step === "register"
          ? <RegisterForm onRegistered={() => setStep("verify")} />
          : <VerificationForm />
        }
      </AuthForm>
    </>
  );
};

export default RegisterContainer;
