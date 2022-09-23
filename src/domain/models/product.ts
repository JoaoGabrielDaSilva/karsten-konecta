export type ProductModel = {
  name: string;
  code: string;
  uri: string;
  ean: string;
  amount?: number;
  hasAvailableAmount?: boolean;
  weight?: number;
  price?: number;
};

export type AttendanceProductModel = ProductModel & {
  id: string;
  totalPrice: number;
  totalWeight: number;
};

export type RefreshedAttendanceProductModel = ProductModel & {
  availableAmount?: number;
};
