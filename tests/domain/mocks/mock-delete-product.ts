import { faker } from "@faker-js/faker";
import { DeleteProduct } from "../../../src/domain/usecases/attendance/delete-product";

export const mockDeleteProductParams = (): DeleteProduct.Params => ({
  id: faker.random.numeric(8),
  storeId: faker.random.numeric(8),
});

export const mockDeleteProductModel = (): DeleteProduct.Model => ({
  id: faker.random.numeric(8),
});
