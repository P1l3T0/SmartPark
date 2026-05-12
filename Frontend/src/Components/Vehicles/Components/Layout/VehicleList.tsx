import EmptyVehicles from "./NoVehicles";
import VehicleItemRender from "./VehicleCard";
import useChangeVehiclePage from "../../../../Hooks/Vehicles/useChangeVehiclePage";
import type { VehicleResponse } from "../../../../Utils/interfaces";
import { Pager } from "@progress/kendo-react-data-tools";
import { Card, CardBody, CardFooter, CardHeader } from "@progress/kendo-react-layout";

const VehicleList = ({ vehicles }: { vehicles: VehicleResponse[] }) => {
  const { skip, take, pagedData, handlePageChange } = useChangeVehiclePage(vehicles);

  return (
    <Card className="border border-border shadow-md">
      <CardHeader>
        <h3 className="text-xl font-medium">My Vehicles</h3>
      </CardHeader>
      <CardBody>
        {vehicles && vehicles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pagedData.map((vehicle) => (
              <VehicleItemRender key={vehicle.id} dataItem={vehicle} />
            ))}
          </div>
        ) : (
          <EmptyVehicles />
        )}
      </CardBody>
      {vehicles && vehicles.length > 0 && (
        <CardFooter>
          <Pager
            size={"small"}
            className="k-listview-pager"
            skip={skip}
            take={take}
            onPageChange={handlePageChange}
            total={vehicles.length}
          />
        </CardFooter>
      )}
    </Card>
  );
};

export default VehicleList;