import { CustomerAddressModel } from "./address";

export enum PersonType {
  NATURAL,
  LEGAL,
}

export enum Gender {
  UNINFORMED = "NI",
  MALE = "M",
  FEMALE = "F",
}

type GenericCustomer = {
  id: string;
  name: string;
  email: string;
  cpfCnpj: string;
  phone: string;
  optEmail: boolean;
  personType: PersonType;

  addressList: CustomerAddressModel[];
  optSms: boolean;
  optPhoneCall: boolean;
  optWhatsapp: boolean;
};

type LegalCustomer = GenericCustomer & {
  fantasyName: string;
  stateRegistration: string;
  responsibleName: string;
};

type NaturalCustomer = GenericCustomer & {
  gender: Gender;
  birthDate: string;
};

export type CustomerModel = LegalCustomer | NaturalCustomer;
