import { CustomerAddressModel } from "../../models/address";

export interface CreateCustomerAddress {
  execute(
    params: CreateCustomerAddress.Params
  ): Promise<CreateCustomerAddress.Model>;
}

export namespace CreateCustomerAddress {
  export type Params = {
    customerId: string;
    address: Omit<CustomerAddressModel, "id">;
  };

  export type Model = void;
}
