import { ProductModel } from "./Product";

export type AttendanceProductModel = ProductModel & {
  amount: number;
};
