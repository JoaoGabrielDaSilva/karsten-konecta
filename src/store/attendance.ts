import create from "zustand";
import { Address } from "../models/Address";
import { AttendanceProductModel } from "../models/Attendance";

import { faker } from "@faker-js/faker";
import { ShippingModel } from "../models/Shipping";

const productList: AttendanceProductModel[] = [
  {
    name: "Toalha Banhão Karsten Fio Penteado Max Lumina Preto/ Cinza",
    code: "1234",
    uri: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSywiJfzb6kSAJ5wgeUX2xN4N_zIUOrOJLkPMY_NTmhMSe74nnJjawHlhqVHFnJxQBcSocfoXEiUSc&usqp=CAc",
    ean: "17559272547197",
    amount: 3,
  },
  {
    name: "Toalha Banhão Karsten Fio Penteado Max Lumina Preto/ Cinza",
    code: "5678",
    uri: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSywiJfzb6kSAJ5wgeUX2xN4N_zIUOrOJLkPMY_NTmhMSe74nnJjawHlhqVHFnJxQBcSocfoXEiUSc&usqp=CAc",
    ean: "17559272547197",
    amount: 5,
  },
  {
    name: "Toalha Banhão Karsten Fio Penteado Max Lumina Preto/ Cinza",
    code: "9101",
    uri: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSywiJfzb6kSAJ5wgeUX2xN4N_zIUOrOJLkPMY_NTmhMSe74nnJjawHlhqVHFnJxQBcSocfoXEiUSc&usqp=CAc",
    ean: "17559272547197",
    amount: 7,
  },
  {
    name: "Toalha Banhão Karsten Fio Penteado Max Lumina Preto/ Cinza",
    code: "1213",
    uri: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSywiJfzb6kSAJ5wgeUX2xN4N_zIUOrOJLkPMY_NTmhMSe74nnJjawHlhqVHFnJxQBcSocfoXEiUSc&usqp=CAc",
    ean: "17559272547197",
    amount: 10,
  },
];

type AttendanceState = {
  name: string;
  productList: AttendanceProductModel[];
  address: Address;
  shippingInfo: ShippingModel;
  loading: boolean;
  getAttendance: () => void;
  increaseProductAmount: (where: { code: string }) => void;
  decreaseProductAmount: (where: { code: string }) => void;
};

export const mockAddress = (): Address => {
  return {
    name: "João",
    street: faker.address.street(),
    city: faker.address.city(),
    district: "Feitoria",
    number: faker.address.buildingNumber(),
    reference: "Perto de tal lugar",
    complement: "Casa",
    state: "RS",
    cep: "93054-190",
  };
};

const initialState = {
  name: "Teste",
  address: null,
  shippingInfo: null,
  productList: [],
  loading: true,
};

export const useAttendanceStore = create<AttendanceState>()((set) => ({
  ...initialState,
  getAttendance: () =>
    set({
      productList,
      loading: false,
      name: "João Gabriel",
      address: mockAddress(),
      shippingInfo: {
        days: 2,
      },
    }),
  increaseProductAmount: ({ code }) =>
    set((state) => {
      const freshProductList = state.productList.map((product) => {
        if (product.code === code) {
          return {
            ...product,
            amount: product.amount + 1,
          };
        }
        return product;
      });

      return { ...state, productList: freshProductList };
    }),
  decreaseProductAmount: ({ code }) =>
    set((state) => {
      const freshProductList = state.productList.map((product) => {
        if (product.code === code) {
          return {
            ...product,
            amount: product.amount - 1,
          };
        }
        return product;
      });

      return { ...state, productList: freshProductList };
    }),
}));
