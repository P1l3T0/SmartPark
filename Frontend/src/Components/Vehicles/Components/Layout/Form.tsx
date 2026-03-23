import { Card, CardHeader } from "@progress/kendo-react-layout";
import VehicleForm from "../Form/VehicleForm";
import type { VehicleDto } from "../../../../Utils/interfaces";

const Form = ({ setVehicles }: { setVehicles: React.Dispatch<React.SetStateAction<VehicleDto[]>> }) => {
  const handleVehicleAdded = () => {
    const stored = localStorage.getItem("vehicles");
    if (stored) setVehicles(JSON.parse(stored));
  };

  return (
    <aside>
      <Card className="border border-border shadow-md h-full">
        <CardHeader className="border-border">
          <h3 className="text-xl font-medium">Add New Vehicle</h3>
        </CardHeader>
        <VehicleForm onVehicleAdded={handleVehicleAdded} />
      </Card>
    </aside>
  );
};

export default Form;