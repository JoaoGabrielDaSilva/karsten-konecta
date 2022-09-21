import { CustomerModel, PersonType } from "../../models/customer";

export interface EditCustomer {
  execute(params: EditCustomer.Params): Promise<EditCustomer.Model>;
}

export namespace EditCustomer {
  export type Params = {
    storeId: string;
    type: PersonType;
    customer: CustomerModel;
  };

  export type Model = void;
}
