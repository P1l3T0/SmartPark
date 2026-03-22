import VehicleCard from "../VehicleCard";
import type { VehicleDto } from "../../../../Utils/interfaces";

const VehicleList = ({ vehicles }: { vehicles: VehicleDto[] }) => {
  return (
    <section className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="border-b border-border bg-primary/5 px-6 py-4">
        <h2 className="font-semibold text-text-primary">My Vehicles</h2>
      </div>
      <div className="px-6 py-5">
      {vehicles.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card/50 py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="h-9 w-9 fill-primary/40"
            >
              <path d="M57.6 24.4 53 12.2A4 4 0 0 0 49.2 10H14.8a4 4 0 0 0-3.8 2.2L6.4 24.4A6 6 0 0 0 2 30v12a2 2 0 0 0 2 2h4a6 6 0 0 0 12 0h24a6 6 0 0 0 12 0h4a2 2 0 0 0 2-2V30a6 6 0 0 0-4.4-5.6zM14.8 14h34.4l3.6 10H11.2l3.6-10zM14 48a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm36 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
            </svg>
          </div>
          <p className="text-base font-medium text-text-primary">
            No vehicles yet
          </p>
          <p className="text-sm text-text-secondary mt-1">
            Add your first vehicle using the form on the left.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-text-primary">
              {vehicles.length} {vehicles.length === 1 ? "Vehicle" : "Vehicles"}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {vehicles.map((vehicle, index) => (
              <VehicleCard key={index} vehicle={vehicle} />
            ))}
          </div>
        </>
      )}
      </div>
    </section>
  );
};

export default VehicleList;