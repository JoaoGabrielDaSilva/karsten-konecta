import { faker } from "@faker-js/faker";
import { RemoteAddProduct } from "../../../src/data/usecases/attendance/remote-add-product";
import { AddProduct } from "../../../src/domain/usecases/attendance/add-product";

const amount = Math.floor(Math.random() * 50);
const id = Number(faker.random.numeric(4));
const totalprice = parseFloat(faker.commerce.price());

export const mockAddProductParams = (): AddProduct.Params => ({
  amount: String(amount),
  attendanceId: faker.random.numeric(4),
  productId: faker.random.numeric(8),
  storeId: faker.random.numeric(8),
});

export const mockRemoteAddProductModel = (): RemoteAddProduct.Model => ({
  Result: {
    QuantidadeAdicionada: amount,
    Id: id,
    TotalItem: totalprice,
  },
});

export const mockAddProductModel = (): AddProduct.Model => ({
  addedAmount: amount,
  id: String(id),
  totalPrice: totalprice,
});
