import { CustomerAddressModel } from "../../models/address";
import { ProductModel } from "../../models/product";
import { StoreAddressModel } from "../../models/store-address-model";

export interface GetOrderDetails {
  execute(params: GetOrderDetails.Params): Promise<GetOrderDetails.Model>;
}

export namespace GetOrderDetails {
  export type Params = {
    storeId: string;
    attendanceId: string;
  };

  export type Model = {
    id: string;
    code: string;
    status: string;
    createdAt: string;
    isPickUp: boolean;
    responsibleName: string;
    responsibleCpf: string;
    address: CustomerAddressModel | StoreAddressModel;
    deliveryForecast: string;
    customer: {
      name: string;
      cpf: string;
    };
    trackingURL: string;
    productList: ProductModel[];
  };
}
