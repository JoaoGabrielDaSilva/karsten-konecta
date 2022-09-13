import create from "zustand";
import { Address } from "../models/Address";

import { AttendanceModel } from "../../domain/models/attendance";

enum DeliveryMode {
  DELIVERY,
  PICK_UP,
}

type AttendanceState = AttendanceModel & {
  setAttendance?: (data: AttendanceModel) => void;
  increaseProductAmount?: (where: { code: string }) => void;
  decreaseProductAmount?: (where: { code: string }) => void;
  setAddress?: ({ address }: { address: Address }) => void;
  toggleDeliveryMode?: () => void;
  clearAttendance?: () => void;
  loading: boolean;
  deliveryMode: DeliveryMode;
};

const initialState: AttendanceState = {
  id: null,
  name: "",
  cpfCnpj: "",
  customer: null,
  deliveryAddress: null,
  shippingInfo: {
    days: null,
  },
  deliveryMode: DeliveryMode.DELIVERY,
  productList: [],
  loading: false,
};

export const useAttendanceStore = create<AttendanceState>()((set) => ({
  ...initialState,
  setAttendance: (data: AttendanceModel) =>
    set((state) => ({
      ...state,
      ...data,
      shippingInfo: {
        days: 2,
      },
    })),
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
  setAddress: ({ address }) =>
    set((state) => ({
      ...state,
      address,
    })),
  toggleDeliveryMode: () =>
    set((state) => ({
      deliveryMode:
        state.deliveryMode === DeliveryMode.DELIVERY
          ? DeliveryMode.PICK_UP
          : DeliveryMode.DELIVERY,
    })),
  clearAttendance: () => set({ ...initialState }),
}));
