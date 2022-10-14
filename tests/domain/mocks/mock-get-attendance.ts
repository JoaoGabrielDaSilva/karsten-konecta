import { faker } from "@faker-js/faker";
import { RemoteGetAttendance } from "../../../src/data/usecases/attendance/remote-get-attendance";
import { CustomerAddressModel } from "../../../src/domain/models/address";
import { AttendanceModel } from "../../../src/domain/models/attendance";
import { AttendanceProductModel } from "../../../src/domain/models/product";
import { GetAttendance } from "../../../src/domain/usecases/attendance/get-attendance";

const productId = faker.random.numeric(4);
const totalProductPrice = parseFloat(faker.commerce.price());
const productWeight = Math.random() * 10;
const productAmount = Math.floor(Math.random() * 50);
const attendanceName = faker.name.firstName();
const cpfCnpj = faker.random.numeric(11);
const productList: AttendanceProductModel[] = [
  {
    id: productId,
    totalPrice: totalProductPrice,
    totalWeight: productWeight * productAmount,
    code: faker.random.numeric(6),
    ean: faker.random.numeric(11),
    name: faker.commerce.productName(),
    uri: faker.internet.url(),
    amount: productAmount,
    weight: productWeight,
    price: Math.random() * 50,
  },
];
const id = faker.random.numeric(4);
const complement = faker.random.words(4);
const reference = faker.random.words(4);
const street = faker.address.street();
const number = faker.address.buildingNumber();
const cep = faker.address.zipCode("#####-##");
const city = faker.address.city();
const district = faker.address.cityName();
const name = faker.name.firstName();
const state = faker.address.state();

const mockAddress = (): CustomerAddressModel => ({
  id,
  complement,
  reference,
  street,
  number,
  cep,
  city,
  district,
  name,
  state,
});

export const mockGetAttendanceParams = (): GetAttendance.Params => ({
  id: faker.random.numeric(4),
  storeId: faker.random.numeric(8),
});

export const mockRemoteGetAttendanceAddressModel = () => ({
  IdConsumidorLojaEndereco: Number(id),
  LogradouroComplemento: complement,
  Referencia: reference,
  Logradouro: street,
  LogradouroNumero: number,
  CEP: cep,
  Cidade: city,
  Bairro: district,
  NomeEndereco: name,
  Estado: state,
});

export const mockRemoteGetAttendanceModel = (): RemoteGetAttendance.Model => ({
  Result: {
    Consumidor: null,
    EnderecoRetireLoja: null,
    CpfCnpjConsumidor: cpfCnpj,
    EnderecoEntrega: null,
    ListaAtendimentoItens: productList.map((item) => ({
      IdAtendimentoItem: item.id,
      Produto: {
        TotalItem: item.totalPrice,
        Codigo: item.code,
        Ean: item.ean,
        FotoPrincipal: item.uri,
        Nome: item.name,
        Peso: item.weight,
        Preco: item.price,
      },
      Quantidade: item.amount,
    })),
    NomeAtendimento: attendanceName,
  },
});

export const mockGetAttendanceModel = (): GetAttendance.Model => ({
  name: attendanceName,
  deliveryAddress: mockAddress(),
  productList,
  cpfCnpj,
});

export class GetAttendanceSpy implements GetAttendance {
  params: GetAttendance.Params;
  data: GetAttendance.Model = mockGetAttendanceModel();
  callsCount: number = 0;

  async get(params: GetAttendance.Params): Promise<GetAttendance.Model> {
    this.params = params;
    this.callsCount++;

    return {
      ...this.data,
      id: params.id,
    };
  }
}
