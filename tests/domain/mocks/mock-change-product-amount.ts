import { faker } from "@faker-js/faker";
import { ChangeProductAmount } from "../../../src/domain/usecases/attendance/change-product-amount";

export const mockChangeProductAmountParams =
  (): ChangeProductAmount.Params => ({});

export const mockChangeProductAmountModel = (): ChangeProductAmount.Model[] => {
  return [
    {
      name: faker.commerce.productName(),
      code: faker.random.numeric(8),
      ean: faker.random.numeric(14),
      uri: faker.internet.url(),
      amount: Math.floor(Math.random() * 30),
    },
  ];
};
