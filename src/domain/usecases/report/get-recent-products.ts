import { ProductModel } from "../../models/product";

export interface GetRecentProducts {
  execute(params: GetRecentProducts.Params): Promise<GetRecentProducts.Model>;
}

export namespace GetRecentProducts {
  export type Params = {
    storeId: string;
    filter: "LOJA";
    type: "VISTOS";
  };

  export type Model = {
    recentProducts: ProductModel[];
  };
}
