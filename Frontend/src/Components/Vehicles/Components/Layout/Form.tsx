import VehicleForm from "../Form/VehicleForm";
import type { VehicleDto } from "../../../../Utils/interfaces";

const Form = ({ setVehicles }: { setVehicles: React.Dispatch<React.SetStateAction<VehicleDto[]>> }) => {
  const handleVehicleAdded = () => {
    const stored = localStorage.getItem("vehicles");
    if (stored) setVehicles(JSON.parse(stored));
  };

  return (
    <aside>
      <div className="h-full rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="border-b border-border bg-primary/5 p-4">
          <h2 className="font-semibold text-text-primary">Add New Vehicle</h2>
        </div>
        <div className="px-4 py-5">
          <VehicleForm onVehicleAdded={handleVehicleAdded} />
        </div>
      </div>
    </aside>
  );
};

export default Form;