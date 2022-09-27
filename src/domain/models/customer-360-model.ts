export type Customer360Model = {
  cpfCnpj: string;
  name: string;
  birthDate: string;
  age: string;
  email: string;
  address: {
    district: string;
    city: string;
    state: string;
    cep: string;
  };
  phone: string;
  ddd: string;
  favoriteStore: string;
  characteristicUpdate: string;
  info: string[];
  callReason: string[];
  whatsapp: string;
  characteristics: string;
};
