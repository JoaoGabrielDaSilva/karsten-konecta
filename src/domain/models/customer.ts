import { AddressModel } from "./address";

export type CustomerModel = {
  name: string;
  cpf: string;
  address: AddressModel;
};
