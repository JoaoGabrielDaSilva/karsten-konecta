import { AttendanceModel } from "../../models/attendance";

export interface GetAttendance {
  get(): Promise<AttendanceModel>;
}
