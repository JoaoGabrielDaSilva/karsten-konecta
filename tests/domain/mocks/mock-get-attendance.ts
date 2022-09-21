import { faker } from "@faker-js/faker";
import { RemoteGetAttendance } from "../../../src/data/usecases/attendance/remote-get-attendance";
import { CustomerAddressModel } from "../../../src/domain/models/address";
import { GetAttendance } from "../../../src/domain/usecases/attendance/get-attendance";

type MockRemoteGetAttendanceModelParams = {
  withAddress?: boolean;
};

const attendanceName = faker.name.firstName();
const cpfCnpj = faker.random.numeric(11);
const productList = [
  {
    code: faker.random.numeric(6),
    ean: faker.random.numeric(11),
    name: faker.commerce.productName(),
    uri: faker.internet.url(),
    amount: Math.floor(Math.random() * 50),
    weight: Math.floor(Math.random() * 50),
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
    CpfCnpjConsumidor: cpfCnpj,
    EnderecoEntrega: null,
    ListaAtendimentoItens: productList.map((item) => ({
      IdAtendimentoItem: faker.random.numeric(6),
      Produto: {
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
