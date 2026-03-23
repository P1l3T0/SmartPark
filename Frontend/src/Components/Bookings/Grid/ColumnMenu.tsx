import type { Booking } from "../../../Utils/interfaces";
import { GridColumnMenuSort, GridColumnMenuGroup, GridColumnMenuFilter, GridColumnMenuColumnsChooser, GridColumnMenuCheckboxFilter, type GridColumnMenuProps } from "@progress/kendo-react-grid";

interface CustomGridColumnMenuProps extends GridColumnMenuProps {
  data: Booking[];
}

const ColumnMenu = (props: CustomGridColumnMenuProps) => {
  return (
    <div>
      <GridColumnMenuSort {...props} />
      <GridColumnMenuGroup {...props} />
      <GridColumnMenuFilter {...props} />
      <GridColumnMenuColumnsChooser {...props} />
      <GridColumnMenuCheckboxFilter {...props} data={props.data} />
    </div>
  );
};

export default ColumnMenu;