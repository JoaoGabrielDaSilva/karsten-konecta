import { ShippingModel } from "../../models/shipping";

export interface GetShippingInfo {
  get(params: GetShippingInfo.Params): Promise<GetShippingInfo.Model>;
}

export namespace GetShippingInfo {
  export type Params = {
    cep: string;
    brandId: string;
    totalWeight: number;
    isDedicated?: boolean;
  };

  export type Model = ShippingModel;
}
