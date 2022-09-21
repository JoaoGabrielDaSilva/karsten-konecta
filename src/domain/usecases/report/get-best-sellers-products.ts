import { ProductModel } from "../../models/product";

export interface GetBestSellersProducts {
  execute(
    params: GetBestSellersProducts.Params
  ): Promise<GetBestSellersProducts.Model>;
}

export namespace GetBestSellersProducts {
  export type Params = {
    storeId: string;
    filter: "TODOS";
    type: "VENDIDOS";
  };

  export type Model = {
    bestSellers: ProductModel[];
  };
}
