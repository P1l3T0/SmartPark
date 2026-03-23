import { Field, FieldWrapper, Form, FormElement, FormFieldSet, type FormRenderProps } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import useVehicleInputs from "./VehicleInputs";
import useVehicle from "../../../../Hooks/Vehicles/useVehicle";
import { CardBody, CardFooter } from "@progress/kendo-react-layout";

interface VehicleFormProps {
  onVehicleAdded: () => void;
}

const VehicleForm = ({ onVehicleAdded }: VehicleFormProps) => {
  const { handleInputChange, handleDropDownChange, handleSubmit } = useVehicle(onVehicleAdded);
  const {
    VehicleModelInput,
    VehicleBrandInput,
    VehicleRegistrationInput,
    PrimaryVehicleInput,
    brandValidator,
    modelValidator,
    registrationValidator,
  } = useVehicleInputs();

  return (
    <Form
      id="vehicle-form"
      onSubmit={handleSubmit}
      render={(formRenderProps: FormRenderProps) => (
        <>
          <CardBody>
            <FormElement id="vehicle-form" className="space-y-5">
              <FormFieldSet className="space-y-4">
            <FieldWrapper>
              <Field
                id={"brand"}
                name={"brand"}
                component={VehicleBrandInput}
                validator={brandValidator}
                onChange={handleDropDownChange}
              />
            </FieldWrapper>
            <FieldWrapper>
              <Field
                id={"model"}
                name={"model"}
                type={"text"}
                component={VehicleModelInput}
                validator={modelValidator}
                onChange={handleInputChange}
              />
            </FieldWrapper>
            <FieldWrapper>
              <Field
                id={"registrationNumber"}
                name={"registrationNumber"}
                type={"text"}
                component={VehicleRegistrationInput}
                validator={registrationValidator}
                onChange={handleInputChange}
              />
            </FieldWrapper>
            <FieldWrapper>
              <Field
                id={"isPrimary"}
                name={"isPrimary"}
                type={"checkbox"}
                component={PrimaryVehicleInput}
                onChange={handleInputChange}
              />
            </FieldWrapper>
              </FormFieldSet>
            </FormElement>
          </CardBody>
          <CardFooter>
            <Button
              type="submit"
              form="vehicle-form"
              themeColor={"primary"}
              className="w-full"
              disabled={!formRenderProps.allowSubmit}
            >
              Save Vehicle
            </Button>
          </CardFooter>
        </>
      )}
    />
  );
};

export default VehicleForm;
