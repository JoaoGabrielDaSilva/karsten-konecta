import { faker } from "@faker-js/faker";
import { RemoteGetOrderList } from "../../../src/data/usecases/attendance/remote-get-order-list";
import { formatFullDate } from "../../../src/presentation/utils/date/format-full-date";

export const mockRemoteGetOrderListModel = (): RemoteGetOrderList.Model => ({
  Result: {
    ListaPedidos: [
      {
        Cliente: faker.name.fullName(),
        CodigoPedido: faker.random.numeric(4),
        DataCriacao: formatFullDate({ date: faker.date.recent() }),
        DataHoraAprovacao: formatFullDate({ date: faker.date.recent() }),
        IdAtendimentoApp: faker.random.numeric(4),
        QuantidadeItens: String(Math.floor(Math.random() * 50)),
        Status: faker.random.word(),
      },
    ],
    TotalRegistros: Math.floor(Math.random() * 1000),
  },
});
