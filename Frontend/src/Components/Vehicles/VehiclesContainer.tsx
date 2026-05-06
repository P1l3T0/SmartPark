import Banner from "../Common/Banner";
import Form from "./Components/Layout/Form";
import VehicleList from "./Components/Layout/VehicleList";

const VehiclesContainer = () => {
  return (
    <main className="min-h-screen bg-background">
      <Banner title={"My Garage"} description={"Manage your registered vehicles"} />
      <div className="mx-auto max-w-9xl p-8">
        <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-8">
          <Form />
          <VehicleList />
        </div>
      </div>
    </main>
  );
};

export default VehiclesContainer;