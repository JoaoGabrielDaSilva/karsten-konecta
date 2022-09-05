import { faker } from "@faker-js/faker";
import { AddProduct } from "../../../src/domain/usecases/attendance/add-product";

export const mockAddProductParams = (): AddProduct.Params => ({
  amount: String(Math.floor(Math.random() * 50)),
  attendanceId: faker.random.numeric(4),
  productId: faker.random.numeric(8),
  storeId: faker.random.numeric(8),
});

export const mockAddProductModel = (): AddProduct.Model => ({
  id: faker.random.numeric(8),
  amount: Math.floor(Math.random() * 50),
  price: faker.commerce.price(),
});
