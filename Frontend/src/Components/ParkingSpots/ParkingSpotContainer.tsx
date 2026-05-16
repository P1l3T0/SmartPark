import Banner from "../Common/Banner";
import ParkingMapLegend from "./ParkingSpotsGrid/ParkingMapLegend";
import ParkingGrid from "./ParkingSpotsGrid/ParkingGrid";

const ParkingSpotContainer = () => {
  return (
    <main className="bg-background">
      <div className="min-h-[calc(100vh-4.05rem)] sm:min-h-[calc(100vh-4.55rem)]">
        <Banner title="Parking Map" description="Browse and book available parking spots" />
        <div className="mx-auto max-w-7xl px-4 py-8 flex flex-col gap-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <ParkingMapLegend />
            <ParkingGrid />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ParkingSpotContainer;

