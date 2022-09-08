export enum PersonType {
  NATURAL,
  LEGAL,
}

export enum Gender {
  UNINFORMED = 0,
  MALE = "M",
  FEMALE = "F",
}

type GenericCustomer = {
  id: string;
  name: string;
  email: string;
  cpfCnpj: string;
  phone: string;
  personType?: PersonType;
  optEmail: boolean;
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
