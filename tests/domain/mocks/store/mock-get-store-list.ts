import { faker } from "@faker-js/faker";
import { GetStoreList } from "../../../../src/domain/usecases/store/get-store-list";
import { GetUserData } from "../../../../src/domain/usecases/user/get-user-data";
import { mockStoreList } from "./mock-store-list";

export class GetStoreListSpy implements GetStoreList {
  storeList = mockStoreList();
  params: GetStoreList.Params;
  callsCount = 0;

  async execute(params: GetStoreList.Params): Promise<GetStoreList.Model> {
    this.callsCount++;
    this.params = params;

    return {
      storeList: this.storeList,
      totalResults: Math.random() * 100,
    };
  }
}
