import { AddressModel } from "./address";
import { CustomerModel } from "./customer";
import { AttendanceProductModel } from "./product";
import { ShippingModel } from "./shipping";

export type AttendanceModel = {
  id?: string;
  name: string;
  cpfCnpj: string;
  productList: AttendanceProductModel[];
  customer?: CustomerModel;
  deliveryAddress?: AddressModel;
};
