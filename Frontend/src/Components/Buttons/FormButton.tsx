import { Button } from "@progress/kendo-react-buttons";
import type { FormRenderProps } from "@progress/kendo-react-form";
import { Link } from "react-router-dom";

interface FormButtonProps {
  to?: string;
  text: string;
  formRenderProps: FormRenderProps;
}

const FormButton = ({ formRenderProps, to, text }: FormButtonProps) => {
  return (
    <>
      <Button
        themeColor={"primary"}
        className={`w-full my-6 ${to ? "" : "mb-2"}`}
        disabled={!formRenderProps.allowSubmit}
      >
        {text}
      </Button>
      {to && (
        <p className="text-center text-sm text-text-secondary">
          {text === "Log In"
            ? "Don't have an account? "
            : "Already have an account? "}
          <Link
            to={to}
            className="text-primary font-medium cursor-pointer hover:underline"
          >
            {text === "Log In" ? "Sign up" : "Log in"}
          </Link>
        </p>
      )}
    </>
  );
};

export default FormButton;