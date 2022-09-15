import create from "zustand";
import { Address } from "../models/Address";

import { AttendanceModel } from "../../domain/models/attendance";
import { ProductModel } from "../../domain/models/product";

enum DeliveryMode {
  DELIVERY,
  PICK_UP,
}

type AttendanceState = AttendanceModel & {
  setAttendance?: (data: AttendanceModel) => void;
  setAddress?: ({ address }: { address: Address }) => void;
  toggleDeliveryMode?: () => void;
  addProduct?: (product: ProductModel) => void;
  refreshProductList?: (params: {
    id: string;
    data: Partial<ProductModel>;
  }) => void;
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

export const useAttendanceStore = create<AttendanceState>()((set, get) => ({
  ...initialState,
  setAttendance: (data: AttendanceModel) =>
    set((state) => ({
      ...state,
      ...data,
      shippingInfo: {
        days: 2,
      },
    })),
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
  refreshProductList({ id, data }) {
    set((state) => {
      const productList = state.productList.map((item) => {
        if (item.id === id) {
          return { ...item, ...data };
        }
        return item;
      });

      return { ...state, productList };
    });
  },
  clearAttendance: () => set({ ...initialState }),
}));
