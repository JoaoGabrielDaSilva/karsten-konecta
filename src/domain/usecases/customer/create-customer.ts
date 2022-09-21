import { CustomerModel, PersonType } from "../../models/customer";

export interface CreateCustomer {
  execute(params: CreateCustomer.Params): Promise<CreateCustomer.Model>;
}

export namespace CreateCustomer {
  export type Params = {
    storeId: string;
    type: PersonType;
    customer: CustomerModel;
  };

  export type Model = void;
}
