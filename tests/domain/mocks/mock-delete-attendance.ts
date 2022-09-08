import { faker } from "@faker-js/faker";
import { DeleteAttendance } from "../../../src/domain/usecases/attendance/delete-attendance";

export const mockDeleteAttendanceParams = (): DeleteAttendance.Params => ({
  id: faker.random.numeric(4),
  storeId: faker.random.numeric(8),
});
