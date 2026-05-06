import { Card, CardHeader } from "@progress/kendo-react-layout";
import VehicleForm from "../Form/VehicleForm";

const Form = () => {

  return (
    <aside>
      <Card className="border border-border shadow-md h-full">
        <CardHeader className="border-border">
          <h3 className="text-xl font-medium">Add New Vehicle</h3>
        </CardHeader>
        <VehicleForm />
      </Card>
    </aside>
  );
};

export default Form;