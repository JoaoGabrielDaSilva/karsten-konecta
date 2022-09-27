export interface GetActionCustomerList {
  execute(
    params: GetActionCustomerList.Params
  ): Promise<GetActionCustomerList.Model>;
}

export namespace GetActionCustomerList {
  export type Params = {
    storeId: string;
    email: string;
    name: string;
    page: number;
  };

  export type CustomerListItem = {
    name: string;
    cpfCnpj: string;
    birthDate: string;
    email: string;
    phone: string;
    openOrders: string;
  };

  export type Model = {
    customerList: CustomerListItem[];
    totalResults: number;
  };
}
