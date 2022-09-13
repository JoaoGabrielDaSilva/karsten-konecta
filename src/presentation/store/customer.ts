import create from "zustand";
import { CustomerModel, Gender } from "../../domain/models/customer";

type CustomerState = {
  data: CustomerModel;
  setCustomer?: (data: CustomerModel) => void;
  clearCustomer?: () => void;
};

const initialState: CustomerState = {
  data: {
    id: "",
    name: "",
    email: "",
    cpfCnpj: "",
    phone: "",
    personType: null,
    optEmail: false,
    optSms: false,
    optPhoneCall: false,
    optWhatsapp: null,
    gender: null,
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
  clearCustomer: () => set({ ...initialState }),
}));
