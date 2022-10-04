import { faker } from "@faker-js/faker";
import { RemoteUpdateProductAmount } from "../../../src/data/usecases/attendance/remote-update-product-amount";
import { UpdateProductAmount } from "../../../src/domain/usecases/attendance/update-product-amount";

const id = faker.random.numeric(4);
const totalAmount = Math.floor(Math.random() * 50);

export const mockUpdateProductAmountParams =
  (): UpdateProductAmount.Params => ({
    id,
    storeId: faker.random.numeric(6),
    sum: !!Math.random(),
  });

export const mockUpdateProductAmountModel = (): UpdateProductAmount.Model => ({
  id,
  totalAmount,
});

export const mockRemoteUpdateProductAmountModel =
  (): RemoteUpdateProductAmount.Model => ({
    Result: {
      IdAtendimentoItem: Number(id),
      Quantidade: totalAmount,
    },
  });
