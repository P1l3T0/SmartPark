import { Error } from "@progress/kendo-react-labels";
import { Input, Checkbox } from "@progress/kendo-react-inputs";
import type { FieldRenderProps } from "@progress/kendo-react-form";

const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;

const emailValidator = (value: string) => emailRegex.test(value) ? "" : "Please enter a valid email.";
const passwordValidator = (value: string) => passwordRegex.test(value) ? "" : "Password must be at least 10 characters, include uppercase, lowercase, number, and special character.";

const EmailInput = (fieldRenderProps: FieldRenderProps) => {
  const { validationMessage, visited, ...rest } = fieldRenderProps;
  return (
    <div className="k-form-field-wrap">
      <Input {...rest} autoComplete="off" placeholder="Email" />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

const PasswordInput = (fieldRenderProps: FieldRenderProps) => {
  const { validationMessage, visited, ...rest } = fieldRenderProps;
  return (
    <div className="k-form-field-wrap">
      <Input
        {...rest}
        autoComplete="off"
        placeholder="Password"
        type="password"
      />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

const UsernameInput = (fieldRenderProps: FieldRenderProps) => {
  const { validationMessage, visited, ...rest } = fieldRenderProps;
  return (
    <div className="k-form-field-wrap">
      <Input {...rest} autoComplete="off" placeholder="Username" />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

const FirstNameInput = (fieldRenderProps: FieldRenderProps) => {
  const { validationMessage, visited, ...rest } = fieldRenderProps;
  return (
    <div className="k-form-field-wrap">
      <Input {...rest} autoComplete="off" placeholder="First Name" />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

const LastNameInput = (fieldRenderProps: FieldRenderProps) => {
  const { validationMessage, visited, ...rest } = fieldRenderProps;
  return (
    <div className="k-form-field-wrap">
      <Input {...rest} autoComplete="off" placeholder="Last Name" />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

const RememberMeInput = (fieldRenderProps: FieldRenderProps) => {
  const { validationMessage, visited, value, ...rest } = fieldRenderProps;
  return (
    <div className="k-form-field-wrap">
      <Checkbox {...rest} checked={!!value} label="Remember me" />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

const useInputValidations = () => ({
  emailValidator,
  EmailInput,
  passwordValidator,
  PasswordInput,
  RememberMeInput,
  UsernameInput,
  FirstNameInput,
  LastNameInput,
});

export default useInputValidations;
