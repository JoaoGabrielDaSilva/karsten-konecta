import { SalesModality } from "../../models/attendance";
import { ProductModel } from "../../models/product";

export interface VerifyAttendanceProducts {
  execute(
    params: VerifyAttendanceProducts.Params
  ): Promise<VerifyAttendanceProducts.Model>;
}

export namespace VerifyAttendanceProducts {
  export type Params = {
    attendanceId: string;
    storeId: string;
    saleModality?: SalesModality;
    shouldSave?: boolean;
  };

  export type Model = {
    updatedProducts: ProductModel[];
    deletedProducts: ProductModel[];
  };
}
