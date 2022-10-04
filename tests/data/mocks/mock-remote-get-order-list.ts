import { faker } from "@faker-js/faker";
import { RemoteGetOrderList } from "../../../src/data/usecases/attendance/remote-get-order-list";
import { GetOrderList } from "../../../src/domain/usecases/attendance/get-order-list";
import { formatFullDate } from "../../../src/presentation/utils/date/format-full-date";

const customerName = faker.name.fullName();
const orderCode = faker.random.numeric(4);
const createdAt = formatFullDate({ date: faker.date.recent() });
const approvedAt = formatFullDate({ date: faker.date.recent() });
const attendanceId = faker.random.numeric(4);
const totalProductsIn = String(Math.floor(Math.random() * 50));
const status = faker.random.word();
const totalResults = Math.floor(Math.random() * 10);

export const mockGetOrderListModel = (): GetOrderList.Model => ({
  orderList: [
    {
      customerName,
      orderCode,
      createdAt,
      approvedAt,
      attendanceId,
      status,
      totalProductsIn,
    },
  ],
  totalResults,
});

export const mockRemoteGetOrderListModel = (): RemoteGetOrderList.Model => ({
  Result: {
    ListaPedidos: [
      {
        Cliente: customerName,
        CodigoPedido: orderCode,
        DataCriacao: createdAt,
        DataHoraAprovacao: approvedAt,
        IdAtendimentoApp: attendanceId,
        QuantidadeItens: totalProductsIn,
        Status: status,
      },
    ],
    TotalRegistros: totalResults,
  },
});
