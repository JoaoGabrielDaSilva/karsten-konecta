import { StoreAddressModel } from "../../models/store-address-model";

export interface GetStoreAddressList {
  execute(): Promise<GetStoreAddressList.Model>;
}

export namespace GetStoreAddressList {
  export type Model = {
    addressList: StoreAddressModel[];
  };
}
