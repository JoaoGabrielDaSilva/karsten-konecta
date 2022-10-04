import { GetUserData } from "../../../../src/domain/usecases/user/get-user-data";
import { mockUserModel } from "./mock-user";

export class GetUserDataSpy implements GetUserData {
  userData = mockUserModel();
  callsCount = 0;

  async execute(): Promise<GetUserData.Model> {
    this.callsCount++;

    return this.userData;
  }
}
