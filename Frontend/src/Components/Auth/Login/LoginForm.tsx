import type { FormRenderProps } from "@progress/kendo-react-form";
import { Form, Field, FormElement, FieldWrapper, FormFieldSet } from "@progress/kendo-react-form";
import FormButton from "../../Buttons/FormButton";
import useInputValidations from "../Form/useInputValidations";
import useLogin from "../../../Hooks/Auth/useLogin";
import ErrorDialog from "../../Common/ErrorDialog";

const LoginForm = () => {
  const { handleSubmit, handleChange, visible, error, toggleDialog } = useLogin();
  const { UsernameInput, passwordValidator, PasswordInput, RememberMeInput } = useInputValidations();

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
                  id={"username"}
                  name={"username"}
                  type={"text"}
                  component={UsernameInput}
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
              <FieldWrapper>
                <Field
                  id={"rememberMe"}
                  name={"rememberMe"}
                  component={RememberMeInput}
                  onChange={handleChange}
                />
              </FieldWrapper>
            </FormFieldSet>

            <FormButton to="/register" text="Log In" formRenderProps={formRenderProps} />
            <ErrorDialog visible={visible} error={error} toggleDialog={toggleDialog} />
          </FormElement>
        )}
      />
    </>
  );
};

export default LoginForm;
