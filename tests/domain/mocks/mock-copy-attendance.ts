import { faker } from "@faker-js/faker";
import { CopyAttendance } from "../../../src/domain/usecases/attendance/duplicate-order";

export const mockCopyAttendanceParams = (): CopyAttendance.Params => ({
  id: faker.random.numeric(4),
  storeId: faker.random.numeric(8),
});

export const mockCopyAttendanceModel = (): CopyAttendance.Model => ({
  id: faker.random.numeric(4),
});
