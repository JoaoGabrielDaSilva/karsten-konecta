import { faker } from "@faker-js/faker";
import { GetCustomer } from "../../../../src/domain/usecases/customer/get-customer";
import { PersonType } from "../../../../src/domain/models/customer";
import { Gender } from "../../../../src/presentation/constants/enums/Gender";
import { formatDate } from "../../../../src/presentation/utils/date/format-date";

export const mockGetCustomerModel = (): GetCustomer.Model => ({
  id: faker.random.numeric(4),
  name: faker.name.fullName(),
  email: faker.internet.email(),
  cpfCnpj: faker.random.numeric(11),
  phone: faker.random.numeric(11),
  personType: PersonType.NATURAL,
  optEmail: !!Math.random(),
  optSms: !Math.random(),
  optPhoneCall: !Math.random(),
  optWhatsapp: !Math.random(),
  addressList: [],
  ...(!!Math.random()
    ? {
        gender: Gender.MALE,
        birthDate: formatDate({ date: faker.date.past() }),
      }
    : {
        fantasyName: faker.company.name(),
        stateRegistration: faker.random.numeric(15),
        responsibleName: faker.name.fullName(),
      }),
});

export class GetCustomerSpy implements GetCustomer {
  data = mockGetCustomerModel();
  params: GetCustomer.Params;
  callsCount = 0;

  async get(params: GetCustomer.Params): Promise<GetCustomer.Model> {
    this.params = params;
    this.callsCount++;

    return this.data;
  }
}
