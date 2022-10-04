import { faker } from "@faker-js/faker";
import { DeleteProduct } from "../../../src/domain/usecases/attendance/delete-product";

export const mockDeleteProductParams = (): DeleteProduct.Params => ({
  id: faker.random.numeric(4),
  storeId: faker.random.numeric(6),
});

export const mockDeleteProductModel = (): DeleteProduct.Model => ({
  deletedProductId: faker.random.numeric(4),
});
