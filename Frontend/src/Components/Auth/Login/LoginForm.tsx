import type { FormRenderProps } from "@progress/kendo-react-form";
import { Form, Field, FormElement, FieldWrapper, FormFieldSet } from "@progress/kendo-react-form";
import FormButton from "../../Buttons/FormButton";
import useInputValidations from "../Form/useInputValidations";
import useLogin from "../../../Hooks/Auth/useLogin";

const LoginForm = () => {
  const { handleSubmit, handleChange } = useLogin();
  const { emailValidator, EmailInput, passwordValidator, PasswordInput } = useInputValidations();

  return (
    <>
      <Form
        id="login-form"
        onSubmit={handleSubmit}
        render={(formRenderProps: FormRenderProps) => (
          <FormElement className="space-y-6">
            <FormFieldSet className="space-y-4">
              <FieldWrapper>
                <Field
                  id={"email"}
                  name={"email"}
                  type={"email"}
                  component={EmailInput}
                  validator={emailValidator}
                  onChange={handleChange}
                  className="w-full"
                />
              </FieldWrapper>
              <FieldWrapper>
                <Field
                  id={"password"}
                  name={"password"}
                  type={"password"}
                  component={PasswordInput}
                  validator={passwordValidator}
                  onChange={handleChange}
                  className="w-full"
                />
              </FieldWrapper>
            </FormFieldSet>

            <FormButton to="/register" text="Log In" formRenderProps={formRenderProps} />
          </FormElement>
        )}
      />
    </>
  );
};

export default LoginForm;
