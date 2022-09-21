import { CustomerAddressModel } from "../../models/address";

export interface GetCustomerAddressList {
  execute(
    params: GetCustomerAddressList.Params
  ): Promise<GetCustomerAddressList.Model>;
}

export namespace GetCustomerAddressList {
  export type Params = {
    id: string;
  };

  export type Model = {
    addressList: CustomerAddressModel[];
  };
}
