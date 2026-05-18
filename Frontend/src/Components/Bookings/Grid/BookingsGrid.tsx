import { Grid, GridColumn as Column, type GridColumnMenuProps } from "@progress/kendo-react-grid";
import useGetBookings from "../../../Hooks/Bookings/useGetBookings";
import ColumnMenu from "./ColumnMenu";
import { ErrorComponent, LoaderComponent } from "../../Common/States";

const BookingsGrid = () => {
  const { bookings, isLoading, isError } = useGetBookings();

  if (isLoading) return <LoaderComponent />;
  if (isError) return <ErrorComponent />;

  const CustomColumnMenu = (props: GridColumnMenuProps) => (
    <ColumnMenu {...props} data={bookings}></ColumnMenu>
  );

  return (
    <>
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="border-b border-border px-5 py-4">
          <h2 className="font-semibold text-text-primary">
            Booking History
          </h2>
        </div>
        <div className="p-4">
          <Grid id="bookings-grid" dataItemKey="bookingId" pageable={true} sortable={true} 
          groupable={true} autoProcessData={true} data={bookings} defaultSkip={0} defaultTake={10}>
            <Column field="bookingId" title="ID" filterable={false} columnMenu={CustomColumnMenu} />
            <Column field="vehicleRegistrationNumber" title="Vehicle" filter="text" columnMenu={CustomColumnMenu} />
            <Column field="parkingSpotId" title="Parking Spot" filter="numeric" columnMenu={CustomColumnMenu} />
            <Column field="startTime" title="Start Time" filter="date" format="{0:g}" columnMenu={CustomColumnMenu} />
            <Column field="endTime" title="End Time" filter="date" format="{0:g}" columnMenu={CustomColumnMenu} />
            <Column field="isCancelled" title="Cancelled" filter="boolean" columnMenu={CustomColumnMenu} />
          </Grid>
        </div>
      </div>
    </>
  );
}

export default BookingsGrid;