import { AddressModel } from "./address";
import { CustomerModel } from "./customer";
import { ProductModel } from "./product";
import { ShippingModel } from "./shipping";

export type AttendanceModel = {
  id: string;
  name: string;
  cpfCnpj: string;
  productList: ProductModel[];
  customer?: CustomerModel;
  deliveryAddress?: AddressModel;
  shippingInfo?: ShippingModel;
};
