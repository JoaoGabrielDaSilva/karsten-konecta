import { AddressModel } from "./address";
import { CustomerModel } from "./customer";
import { ProductModel } from "./product";
import { ShippingModel } from "./shipping";

export type AttendanceModel = {
  id: string;
  name: string;
  productList: ProductModel[];
  customer?: CustomerModel;
  address?: AddressModel;
  shippingInfo?: ShippingModel;
};
