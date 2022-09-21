import { CustomerAddressModel } from "../../models/address";

export interface GetAddressByCep {
  execute(params: GetAddressByCep.Params): Promise<GetAddressByCep.Model>;
}

export namespace GetAddressByCep {
  export type Params = {
    cep: string;
  };

  export type Model = {
    address: Partial<CustomerAddressModel>;
  };
}
