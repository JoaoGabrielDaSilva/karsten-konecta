import { faker } from "@faker-js/faker";
import { AddressModel } from "../../../src/domain/models/address";
import { AttendanceModel } from "../../../src/domain/models/attendance";
import { CustomerModel } from "../../../src/domain/models/customer";
import { ShippingModel } from "../../../src/domain/models/shipping";
import { GetAttendance } from "../../../src/domain/usecases/attendance/get-attendance";

const mockAddress = (): AddressModel => ({
  street: faker.address.street(),
  number: faker.address.buildingNumber(),
  cep: faker.address.zipCode("#####-##"),
  city: faker.address.city(),
  district: faker.address.cityName(),
  name: faker.name.firstName(),
  state: faker.address.state(),
  isMain: Boolean(Math.random()),
});

const mockShippingInfo = (): ShippingModel => ({
  days: Math.floor(Math.random() * 20) + 1,
});

const mockCustomer = (): CustomerModel => ({
  name: faker.name.fullName(),
  cpf: faker.random.numeric(11),
  address: mockAddress(),
});

export const mockRemoteAttendanceModel = (): GetAttendance.Model => ({
  id: faker.random.numeric(4),
  name: faker.name.firstName(),
  address: mockAddress(),
  shippingInfo: mockShippingInfo(),
  customer: mockCustomer(),
  productList: [],
});

export const mockGetAttendanceParams = (): GetAttendance.Params => ({
  id: faker.random.numeric(4),
  storeId: faker.random.numeric(8),
});

export const mockGetAttendanceModel = (): GetAttendance.Model =>
  mockRemoteAttendanceModel();
