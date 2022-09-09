import { faker } from "@faker-js/faker";
import { RemoteAddProduct } from "../../../src/data/usecases/attendance/remote-add-product";
import { AddProduct } from "../../../src/domain/usecases/attendance/add-product";

const amount = Math.floor(Math.random() * 50);

export const mockAddProductParams = (): AddProduct.Params => ({
  amount: String(amount),
  attendanceId: faker.random.numeric(4),
  productId: faker.random.numeric(8),
  storeId: faker.random.numeric(8),
});

export const mockRemoteAddProductModel = (): RemoteAddProduct.Model => ({
  Result: {
    QuantidadeAdicionada: amount,
  },
});

export const mockAddProductModel = (): AddProduct.Model => ({
  addedAmount: amount,
});
