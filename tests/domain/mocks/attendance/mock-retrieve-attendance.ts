import { faker } from "@faker-js/faker";
import { RetrieveAttendance } from "../../../../src/domain/usecases/attendance/retrieve-attendance";

const mockRetrieveAttendanceModel = (): RetrieveAttendance.Model => ({
  id: faker.random.numeric(4),
});

export class RetrieveAttendanceSpy implements RetrieveAttendance {
  data = mockRetrieveAttendanceModel();
  params: RetrieveAttendance.Params;
  callsCount = 0;

  async retrieve(
    params: RetrieveAttendance.Params
  ): Promise<RetrieveAttendance.Model> {
    this.params = params;
    this.callsCount++;

    return this.data;
  }
}
