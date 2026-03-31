import { Grid, GridColumn as Column, type GridColumnMenuProps } from "@progress/kendo-react-grid";
import { bookings } from "../../../Utils/data";
import ColumnMenu from "./ColumnMenu";

const CustomColumnMenu = (props: GridColumnMenuProps) => (
  <ColumnMenu {...props} data={bookings}></ColumnMenu>
);

const BookingsGrid = () => {
  return (
    <>
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="border-b border-border px-5 py-4">
          <h2 className="font-semibold text-text-primary">
            Booking History
          </h2>
        </div>
        <div className="p-4">
          <Grid id="bookings-grid" dataItemKey="id" pageable={true} sortable={true} groupable={true} autoProcessData={true} data={bookings} defaultSkip={0} defaultTake={5}>
            <Column field="id" title="ID" filterable={false} columnMenu={CustomColumnMenu} />
            <Column field="vehicle" title="Vehicle" filter="text" columnMenu={CustomColumnMenu} />
            <Column field="parkingSpot" title="Parking Spot" filter="text" columnMenu={CustomColumnMenu} />
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