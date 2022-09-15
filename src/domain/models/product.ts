export type ProductModel = {
  name: string;
  code: string;
  uri: string;
  ean: string;
  amount?: number;
  hasAvailableAmount?: boolean;
  weigth?: number;
  price?: number;
};

export type AttendanceProductModel = ProductModel & {
  id: string;
};
