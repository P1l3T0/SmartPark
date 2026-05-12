import { Chip } from "@progress/kendo-react-buttons";
import { Label } from "@progress/kendo-react-labels";
import type { VehicleResponse } from "../../../../Utils/interfaces";
import BrandLogo from "./BrandLogo";
import DeleteVehicleButton from "../../../Buttons/DeleteVehicleButton";
import UpdateVehicleButton from "../../../Buttons/UpdateVehicleButton";

interface VehicleItemRenderProps {
  dataItem: VehicleResponse;
}

const VehicleItemRender = (props: VehicleItemRenderProps) => {
  return <VehicleItem dataItem={props.dataItem} />;
};

const VehicleItem = ({ dataItem }: VehicleItemRenderProps) => {
  return (
    <div className="flex flex-col items-center gap-3 p-4 bg-card rounded-lg border border-border hover:shadow-md transition-all duration-200 h-full">
      <div
        className={`h-1 w-full rounded-full ${dataItem.isPrimary ? "bg-primary" : "bg-border"}`}
      />
      <div className="flex items-center justify-center h-20">
        <BrandLogo brand={dataItem.brand} />
      </div>
      <div className="flex flex-col items-center gap-2 mb-2">
        <Label className="text-text-primary font-semibold leading-tight">
          {dataItem.brand} {dataItem.model}
        </Label>
        <Chip
          text={dataItem.registrationNumber}
          fillMode="outline"
          rounded="medium"
          size="small"
          className="font-mono tracking-widest uppercase"
        />
        {dataItem.isPrimary && (
          <Chip
            text="Primary"
            icon="star"
            themeColor="info"
            fillMode="solid"
            rounded="full"
            size="small"
          />
        )}
      </div>
      <div className="flex gap-2 mt-auto w-full justify-end">
        <UpdateVehicleButton vehicle={dataItem} />
        <DeleteVehicleButton vehicle={dataItem} />
      </div>
    </div>
  );
};

export default VehicleItemRender;
