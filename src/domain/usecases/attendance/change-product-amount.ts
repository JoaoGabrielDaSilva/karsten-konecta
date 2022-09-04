import { ProductModel } from "../../models/product";

export type ChangeProductAmountParams = {};

export interface ChangeProductAmount {
  change(params: ChangeProductAmountParams): Promise<ProductModel[]>;
}
