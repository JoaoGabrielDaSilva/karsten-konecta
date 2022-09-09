import { faker } from "@faker-js/faker";
import { RemoteCreateAttendance } from "../../../src/data/usecases/attendance/remote-create-attendance";
import { CreateAttendance } from "../../../src/domain/usecases/attendance/create-attendance";

const id = faker.random.numeric(4);

export const mockCreateAttendanceParams = (): CreateAttendance.Params => ({
  name: faker.name.firstName(),
  cpfCnpj: faker.random.numeric(11),
  customerId: faker.random.numeric(4),
  storeId: faker.random.numeric(4),
});

export const mockCreateAttendanceModel = (): CreateAttendance.Model => ({
  id,
});

export const mockRemoteCreateAttendanceModel =
  (): RemoteCreateAttendance.Model => ({
    Result: {
      Id: id,
    },
  });
