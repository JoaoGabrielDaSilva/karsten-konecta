import { faker } from "@faker-js/faker";
import { GetOrderList } from "../../../src/domain/usecases/attendance/get-order-list";

export const mockGetOrderListParams = (): GetOrderList.Params => ({
  page: Math.round(Math.random() * 10),
  storeId: faker.random.numeric(6),
});
