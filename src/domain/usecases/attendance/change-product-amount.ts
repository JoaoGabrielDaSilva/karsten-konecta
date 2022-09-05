import { ProductModel } from "../../models/product";

export interface ChangeProductAmount {
  change(
    params: ChangeProductAmount.Params
  ): Promise<ChangeProductAmount.Model[]>;
}

export namespace ChangeProductAmount {
  export type Params = {
    id: string;
    storeId: string;
    sum?: boolean;
  };

  export type Model = ProductModel;
}
