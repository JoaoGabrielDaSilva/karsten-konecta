import { CustomerAddressModel } from "./address";
import { CustomerModel } from "./customer";
import { AttendanceProductModel } from "./product";
import { ShippingModel } from "./shipping";
import { StoreAddressModel } from "./store-address-model";

export enum SalesModality {
  InfiniteShelf = "Prateleira",
  SaleLink = "VendaLink",
}

export type AttendanceModel = {
  id?: string;
  name: string;
  hasCustomer?: boolean;
  cpfCnpj: string;
  productList: AttendanceProductModel[];
  customer?: {
    name: string;
    cpfCnpj: string;
    id: string;
  };
  deliveryAddress?: CustomerAddressModel;
  pickUpAddress?: StoreAddressModel;
  shipping?: ShippingModel;
};
