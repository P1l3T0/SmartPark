import { Button } from "@progress/kendo-react-buttons";
import useResendVerificationCode from "../../Hooks/Auth/useResendVerificationCode";

const ResendVerificationCodeButton = () => {
  const { handleResendVerificationCode } = useResendVerificationCode();

  return (
    <>
      <Button themeColor={"tertiary"} className="w-full mb-2" onClick={handleResendVerificationCode}>
        Resend Code
      </Button>
    </>
  );
};

export default ResendVerificationCodeButton;