import { useState, useEffect } from "react";
import Banner from "../Common/Banner";
import Form from "./Components/Layout/Form";
import type { Vehicle } from "../../Utils/interfaces";
import VehicleList from "./Components/Layout/VehicleList";

const VehiclesContainer = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("vehicles");
    if (stored) setVehicles(JSON.parse(stored));
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Banner title={"My Garage"} description={"Manage your registered vehicles"} />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
          <Form setVehicles={setVehicles} />
          <VehicleList vehicles={vehicles} />
        </div>
      </div>
    </main>
  );
};

export default VehiclesContainer;