import { ShippingModel } from "../../models/shipping";

export interface FinishAttendance {
  execute(params: FinishAttendance.Params): Promise<FinishAttendance.Model>;
}

export namespace FinishAttendance {
  export type Params = {
    attendanceId: string;
    storeId: string;
    shipping: ShippingModel;
    isSaleLink?: boolean;
  };

  export type Model = {
    wasSplitted: boolean;
    splitMessage: string;
  };
}
