import { CustomerAddressModel } from "../../models/address";
import { Customer360Model } from "../../models/customer-360-model";

export interface GetActionCustomerDetails {
  execute(
    params: GetActionCustomerDetails.Params
  ): Promise<GetActionCustomerDetails.Model>;
}

export namespace GetActionCustomerDetails {
  export type Params = {
    storeId: string;
    cpfCnpj: string;
  };

  export type Model = Customer360Model;
}
