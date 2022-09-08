import { ProductModel } from "../../models/product";

export interface GetProductList {
  get(params: GetProductList.Params): Promise<GetProductList.Model>;
}

export namespace GetProductList {
  export type Params = {
    page: number;
    query?: string;
    order: string;
    brandId: string;
    category?: string;
    storeId: string;
  };

  export type Model = {
    productList: ProductModel[];
    totalResults: number;
  };
}
