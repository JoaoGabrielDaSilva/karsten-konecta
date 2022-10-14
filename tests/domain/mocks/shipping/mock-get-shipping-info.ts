import { faker } from "@faker-js/faker";
import { ShippingModel } from "../../../../src/domain/models/shipping";
import { GetShippingInfo } from "../../../../src/domain/usecases/shipping/get-shipping-info";

export const mockShippingInfoModel = (): GetShippingInfo.Model => ({
  company: faker.company.name(),
  days: Math.random() * 15 + 1,
});

export class GetShippingInfoSpy implements GetShippingInfo {
  data: GetShippingInfo.Model = mockShippingInfoModel();
  params: GetShippingInfo.Params;
  callsCount = 0;

  async get(params: GetShippingInfo.Params): Promise<GetShippingInfo.Model> {
    this.params = params;
    this.callsCount++;

    return this.data;
  }
}
