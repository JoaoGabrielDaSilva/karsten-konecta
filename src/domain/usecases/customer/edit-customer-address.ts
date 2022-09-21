import { CustomerAddressModel } from "../../models/address";

export interface EditCustomerAddress {
  execute(
    params: EditCustomerAddress.Params
  ): Promise<EditCustomerAddress.Model>;
}

export namespace EditCustomerAddress {
  export type Params = {
    customerId: string;
    address: CustomerAddressModel;
  };

  export type Model = void;
}
