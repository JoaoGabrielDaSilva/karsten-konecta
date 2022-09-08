import create from "zustand";
import { CustomerModel, Gender } from "../../domain/models/customer";

type CustomerState = {
  data: CustomerModel;
  setCustomer?: (data: CustomerModel) => void;
};

const initialState: CustomerState = {
  data: {
    id: "10",
    name: "João",
    email: "joao.gabsilva1007@gmail.com",
    cpfCnpj: "02526108063",
    phone: "51995702823",
    personType: null,
    optEmail: false,
    optSms: true,
    optPhoneCall: true,
    optWhatsapp: null,
    gender: Gender.MALE,
    birthDate: null,
    fantasyName: "",
    stateRegistration: null,
    responsibleName: "",
  },
};

export const useCustomerStore = create<CustomerState>((set) => ({
  ...initialState,
  setCustomer: (data: CustomerModel) =>
    set((state) => ({
      ...state,
      data,
    })),
}));
