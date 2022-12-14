export type CustomerAddressModel = {
  id: string;
  name: string;
  cep: string;
  street: string;
  number: string;
  district: string;
  complement?: string;
  city: string;
  state: string;
  reference?: string;
  isMain?: boolean;
};
