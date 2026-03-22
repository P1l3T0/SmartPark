import type { FieldRenderProps } from "@progress/kendo-react-form";
import { Checkbox, Input, MaskedTextBox } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Error } from "@progress/kendo-react-labels";
import { carBrands } from "../../../Utils/data";

const brandValidator = (value: string) => (value ? "" : "Brand is required");
const modelValidator = (value: string) => (value ? "" : "Model is required");
const registrationValidator = (value: string) => (value ? "" : "Registration Number is required");

const VehicleBrandInput = (fieldRenderProps: FieldRenderProps) => {
  const { validationMessage, visited, ...rest } = fieldRenderProps;
  return (
    <div className="k-form-field-wrap">
      <DropDownList {...rest} data={carBrands} defaultItem="Select Brand" />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
}

const VehicleModelInput = (fieldRenderProps: FieldRenderProps) => {
  const { validationMessage, visited, ...rest } = fieldRenderProps;
  return (
    <div className="k-form-field-wrap">
      <Input {...rest} autoComplete="off" placeholder="Model" />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

const VehicleRegistrationInput = (fieldRenderProps: FieldRenderProps) => {
  const { validationMessage, visited, ...rest } = fieldRenderProps;
  return (
    <div className="k-form-field-wrap">
      <MaskedTextBox {...rest} mask="LL 0000 LL" placeholder="CB 1234 AA" />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
}

const PrimaryVehicleInput = (fieldRenderProps: FieldRenderProps) => {
  const { validationMessage, ...rest } = fieldRenderProps;
  return (
    <div className="k-form-field-wrap">
      <Checkbox {...rest} label="Make as Primary Vehicle" />
    </div>
  );
}

const VehicleInputs = () => ({
  VehicleModelInput,
  VehicleBrandInput,
  VehicleRegistrationInput,
  PrimaryVehicleInput,
  brandValidator,
  modelValidator,
  registrationValidator,
});

export default VehicleInputs;