import { ProductModel } from "../../models/product";

export interface GetProductDetails {
  get(params: GetProductDetails.Params): Promise<GetProductDetails.Model>;
}

export namespace GetProductDetails {
  export type Params = {
    code: string;
    storeId: string;
  };

  export type Model = {
    carouselImages: string[];
    ean: string;
    suggestions: ProductModel[];
    price: number;
    weight: number;
    productInfoHtml: string;
    videoUri: string;
    specifications: { label: string; value: string }[];
    color: string;
    name: string;
    code: string;
    costPrice: number;
  };
}
