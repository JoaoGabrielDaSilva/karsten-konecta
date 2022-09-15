import { AttendanceProductModel } from "../../models/product";

export interface UpdateProductAmount {
  execute(
    params: UpdateProductAmount.Params
  ): Promise<UpdateProductAmount.Model>;
}

export namespace UpdateProductAmount {
  export type Params = {
    id: string;
    storeId: string;
    sum?: boolean;
  };

  export type Model = {
    id: string;
    totalAmount: number;
  };
}
