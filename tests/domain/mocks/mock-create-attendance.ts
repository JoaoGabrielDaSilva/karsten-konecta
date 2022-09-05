import { faker } from "@faker-js/faker";
import { CreateAttendance } from "../../../src/domain/usecases/attendance/create-attendance";

export const mockCreateAttendanceParams = (): CreateAttendance.Params => ({
  name: faker.name.firstName(),
  cpf: faker.random.numeric(11),
});

export const mockCreateAttendanceModel = (): CreateAttendance.Model => ({
  id: faker.random.numeric(4),
});
