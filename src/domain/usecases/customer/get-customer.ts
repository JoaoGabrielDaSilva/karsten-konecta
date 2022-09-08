import { CustomerModel } from "../../models/customer";

export interface GetCustomer {
  get(params: GetCustomer.Params): Promise<GetCustomer.Model>;
}

export namespace GetCustomer {
  export type Params = {
    cpfCnpj: string;
    storeId: string;
  };

  export type Model = CustomerModel;
}
