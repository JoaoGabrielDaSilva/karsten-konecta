export interface GetSaleLinkConfiguration {
  execute(
    params: GetSaleLinkConfiguration.Params
  ): Promise<GetSaleLinkConfiguration.Model>;
}

export namespace GetSaleLinkConfiguration {
  export type Params = {
    storeId: string;
  };

  export type SaleTypeItem = {
    default: boolean;
    value: string;
  };

  export type Model = {
    saleTypeList: SaleTypeItem[];
  };
}
