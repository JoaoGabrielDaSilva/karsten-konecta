import { faker } from "@faker-js/faker";
import { subDays } from "date-fns";
import { RemoteGetAttendanceList } from "../../../src/data/usecases/attendance/remote-get-attendance-list";
import { GetAttendanceList } from "../../../src/domain/usecases/attendance/get-attendance-list";

const totalResults = Math.floor(Math.random() * 1000);
const customerName = faker.name.fullName();
const cpfCnpj = faker.random.numeric(11);
const createdAt = faker.date.recent();
const totalProductsInCart = Math.floor(Math.random() * 50);
const lastProductTotalAmount = Math.floor(Math.random() * 50);
const lastAddedProduct = {
  code: faker.random.numeric(8),
  ean: faker.random.numeric(11),
  uri: faker.internet.url(),
  name: faker.commerce.productName(),
  amount: lastProductTotalAmount,
};

export const mockGetAttendanceListParams = (): GetAttendanceList.Params => ({
  page: 0,
  storeId: faker.random.numeric(8),
  name: faker.name.firstName(),
  cpfCnpj: faker.random.numeric(11),
  initialDate: "",
  endDate: "",
});

export const mockRemoteGetAttendanceListModel =
  (): RemoteGetAttendanceList.Model => ({
    Result: {
      ListaAtendimentos: [
        {
          Consumidor: {
            Cpf: cpfCnpj,
            IdConsumidor: faker.random.numeric(4),
            NomeConsumidor: customerName,
          },
          CpfCnpjConsumidor: cpfCnpj,
          DataCriacao: createdAt,
          TotalItensCarrinho: totalProductsInCart,
          Descricao: customerName,
          UltimoProduto: {
            Nome: lastAddedProduct.name,
            Codigo: lastAddedProduct.code,
            Ean: lastAddedProduct.ean,
            FotoPrincipal: lastAddedProduct.uri,
          },
          IdAtendimentoApp: faker.random.numeric(4),
          TotalItensProduto: lastProductTotalAmount,
        },
      ],
      TotalRegistros: totalResults,
    },
  });

export const mockGetAttendanceListModel = (): GetAttendanceList.Model => ({
  totalResults,
  attendanceList: [
    {
      lastAddedProduct,
      name: customerName,
      createdAt,
      cpfCnpj,
      totalProductsInCart,
    },
  ],
});
