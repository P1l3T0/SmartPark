import EmptyVehicles from "./NoVehicles";
import VehicleItemRender from "./VehicleCard";
import useChangeVehiclePage from "../../../../Hooks/Vehicles/useChangeVehiclePage";
import { Pager } from "@progress/kendo-react-data-tools";
import { Card, CardBody, CardFooter, CardHeader } from "@progress/kendo-react-layout";
import useGetUserVehicles from "../../../../Hooks/Vehicles/useGetUserVehicles";
import { ErrorComponent, LoaderComponent } from "../../../Common/States";

const VehicleList = () => {
  const { data: vehicles, isLoading, isError } = useGetUserVehicles();
  const { skip, take, pagedData, handlePageChange } = useChangeVehiclePage(vehicles || []);

  if (isLoading) return <LoaderComponent />;
  if (isError) return <ErrorComponent />;

  return (
    <Card className="border border-border shadow-md">
      <CardHeader>
        <h3 className="text-xl font-medium">My Vehicles</h3>
      </CardHeader>
      <CardBody>
        {vehicles && vehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
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