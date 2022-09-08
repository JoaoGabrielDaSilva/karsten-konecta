export interface GetShippingInfo {
  get(params: GetShippingInfo.Params): Promise<GetShippingInfo.Model>;
}

export namespace GetShippingInfo {
  export type Params = {
    cep: string;
    brandId: string;
    totalWeight: number;
  };

  export type Model = {
    days: number;
  };
}
