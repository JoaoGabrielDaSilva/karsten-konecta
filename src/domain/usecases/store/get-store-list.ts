import { StoreModel } from "../../../presentation/models/Store";

export interface GetStoreList {
  execute(params: GetStoreList.Params): Promise<GetStoreList.Model>;
}

export namespace GetStoreList {
  export type Params = {
    page: number;
    name?: string;
    cnpj?: string;
  };

  export type Model = {
    storeList: StoreModel[];
    totalResults: number;
  };
}
