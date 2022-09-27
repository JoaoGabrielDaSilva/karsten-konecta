import create from "zustand";
import { CustomerAddressModel } from "../../domain/models/address";

import { AttendanceModel } from "../../domain/models/attendance";
import { AttendanceProductModel } from "../../domain/models/product";
import { ShippingModel } from "../../domain/models/shipping";
import { StoreAddressModel } from "../../domain/models/store-address-model";

export enum DeliveryMode {
  DELIVERY,
  PICK_UP,
}

type AttendanceState = AttendanceModel & {
  setAttendance?: (data: AttendanceModel) => void;
  setAddressDeliveryAddress?: ({
    address,
  }: {
    address: CustomerAddressModel;
  }) => void;
  setAddressPickupAddress?: ({
    address,
  }: {
    address: StoreAddressModel;
  }) => void;
  toggleDeliveryMode?: () => void;
  setShippingInfo?: (data: ShippingModel) => void;
  refreshProductList?: (params: {
    id: string;
    sum: boolean;
    data: Partial<AttendanceProductModel>;
  }) => void;
  removeProduct?: (params: { id: string }) => void;
  clearAttendance?: () => void;
  loading: boolean;
  deliveryMode: DeliveryMode;
  productAmount: number;
};

const initialState: AttendanceState = {
  id: null,
  name: "",
  cpfCnpj: "",
  customer: null,
  deliveryAddress: null,
  pickUpAddress: null,
  deliveryMode: DeliveryMode.DELIVERY,
  productList: [],
  loading: false,
  shipping: null,
  productAmount: 0,
};

export const useAttendanceStore = create<AttendanceState>()((set) => ({
  ...initialState,
  setAttendance: (data: AttendanceModel) => {
    const productAmount = data.productList.reduce(
      (total, product) => total + product.amount,
      0
    );

    console.log("TESTE", productAmount);

    set((state) => ({
      ...state,
      ...data,
      productAmount,
    }));
  },
  setDeliveryAddress: ({ address }) =>
    set((state) => ({
      ...state,
      deliveryAddress: address,
    })),
  setAddressPickupAddress: ({ address }) =>
    set((state) => ({
      ...state,
      pickUpAddress: address,
    })),
  toggleDeliveryMode: () =>
    set((state) => ({
      deliveryMode:
        state.deliveryMode === DeliveryMode.DELIVERY
          ? DeliveryMode.PICK_UP
          : DeliveryMode.DELIVERY,
    })),
  refreshProductList({ id, data, sum }) {
    set((state) => {
      const { productList, productAmount } = state.productList.reduce(
        (acc, item) => {
          if (item.id === id) {
            return {
              productList: [
                ...acc.productList,
                {
                  ...item,
                  ...data,
                },
              ],
              productAmount: acc.productAmount + item.amount + (sum ? 1 : -1),
            };
          }
          return {
            productList: acc.productList,
            productAmount: acc.productAmount + item.amount + (sum ? 1 : -1),
          };
        },
        { productList: [], productAmount: 0 }
      );

      return { ...state, productList, productAmount };
    });
  },
  setShippingInfo: (data) => set({ shipping: data }),

  removeProduct: ({ id }) =>
    set((state) => ({
      productList: state.productList.filter((item) => item.id !== id),
    })),
  clearAttendance: () => set({ ...initialState }),
}));
