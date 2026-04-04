import type { FormRenderProps } from "@progress/kendo-react-form";
import { Form, Field, FormElement, FieldWrapper, FormFieldSet } from "@progress/kendo-react-form";
import useVerify from "../../../Hooks/Auth/useVerify";
import useInputValidations from "../Form/useInputValidations";
import FormButton from "../../Buttons/FormButton";

const VerificationForm = () => {
  const { handleChange, handleSubmit } = useVerify();
  const { VerificationCodeInput } = useInputValidations();

  return (
    <Form
      id="verification-form"
      onSubmit={handleSubmit}
      render={(formRenderProps: FormRenderProps) => (
        <FormElement className="space-y-6">
          <FormFieldSet className="space-y-4">
            <FieldWrapper>
              <Field
                id={"verificationCode"}
                name={"verificationCode"}
                component={VerificationCodeInput}
                onChange={handleChange}
              />
            </FieldWrapper>
          </FormFieldSet>

          <FormButton to="/login" text="Verify" formRenderProps={formRenderProps} />
        </FormElement>
      )}
    />
  );
};

export default VerificationForm;