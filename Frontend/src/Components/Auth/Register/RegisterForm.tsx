import type { FormRenderProps } from "@progress/kendo-react-form";
import { Form, Field, FormElement, FieldWrapper, FormFieldSet } from "@progress/kendo-react-form";
import useRegister from "../../../Hooks/Auth/useRegister";
import useInputValidations from "../Form/useInputValidations";
import FormButton from "../../Buttons/FormButton";

interface RegisterFormProps {
  onRegistered: () => void;
}

const RegisterForm = ({ onRegistered }: RegisterFormProps) => {
  const { handleSubmit, handleChange } = useRegister(onRegistered);
  const { emailValidator, EmailInput, passwordValidator, PasswordInput, UsernameInput } = useInputValidations();

  return (
    <Form 
      id="register-form"
      onSubmit={handleSubmit}
      render={(formRenderProps: FormRenderProps) => (
        <FormElement className="space-y-6">
          <FormFieldSet className="space-y-4">
            <FieldWrapper>
              <Field
                id={"username"}
                name={"username"}
                component={UsernameInput}
                onChange={handleChange}
              />
            </FieldWrapper>
            <FieldWrapper>
              <Field
                id={"email"}
                name={"email"}
                type={"email"}
                component={EmailInput}
                validator={emailValidator}
                onChange={handleChange}
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
              />
            </FieldWrapper>
          </FormFieldSet>

          <FormButton to="/login" text="Create Account" formRenderProps={formRenderProps} />
        </FormElement>
      )}
    />
  );
};

export default RegisterForm;