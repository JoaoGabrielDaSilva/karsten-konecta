import create from "zustand";
import { CustomerAddressModel } from "../../domain/models/address";

import { AttendanceModel } from "../../domain/models/attendance";
import { AttendanceProductModel } from "../../domain/models/product";
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
  addProduct?: (product: AttendanceProductModel) => void;
  refreshProductList?: (params: {
    id: string;
    data: Partial<AttendanceProductModel>;
  }) => void;
  removeProduct?: (params: { id: string }) => void;
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
  pickUpAddress: null,
  deliveryMode: DeliveryMode.DELIVERY,
  productList: [],
  loading: false,
  shipping: null,
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
  addProduct: (params) =>
    set((state) => {
      const exists = state.productList.some(
        (item) => item.code === params.code
      );

      if (exists)
        return {
          productList: state.productList.map((item) => {
            if (item.code === params.code) {
              return {
                ...params,
                amount: params.amount + item.amount,
                totalPrice: Number(
                  (item.price * (params.amount + item.amount)).toFixed(2)
                ),
                totalWeight: Number(
                  (params.weight * (params.amount + item.amount)).toFixed(2)
                ),
              };
            }

            return item;
          }),
        };

      return {
        productList: [
          ...state.productList,
          {
            ...params,
            totalPrice: Number((params.amount * params.price).toFixed(2)),
            totalWeight: Number((params.weight * params.amount).toFixed(2)),
          },
        ],
      };
    }),
  removeProduct: ({ id }) =>
    set((state) => ({
      productList: state.productList.filter((item) => item.id !== id),
    })),
  clearAttendance: () => set({ ...initialState }),
}));
