import { faker } from "@faker-js/faker";
import { RemoteGetAttendance } from "../../../src/data/usecases/attendance/remote-get-attendance";
import { AddressModel } from "../../../src/domain/models/address";
import { ShippingModel } from "../../../src/domain/models/shipping";
import { GetAttendance } from "../../../src/domain/usecases/attendance/get-attendance";

const attendanceName = faker.name.firstName();
const cpfCnpj = faker.random.numeric(11);
const productList = [];
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
const isMain = Boolean(Math.random());

const mockAddress = (): AddressModel => ({
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

export const mockRemoteGetAttendanceModel = (): RemoteGetAttendance.Model => ({
  Result: {
    CpfCnpjConsumidor: cpfCnpj,
    EnderecoEntrega: {
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
    },
    ListaAtendimentoItens: productList,
    NomeAtendimento: attendanceName,
  },
});

export const mockGetAttendanceModel = (): GetAttendance.Model => ({
  name: attendanceName,
  deliveryAddress: mockAddress(),
  productList,
  cpfCnpj,
});
