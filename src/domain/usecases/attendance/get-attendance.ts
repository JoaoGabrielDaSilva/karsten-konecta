import { AttendanceModel } from "../../models/attendance";

export interface GetAttendance {
  get(params: GetAttendance.Params): Promise<GetAttendance.Model>;
}

export namespace GetAttendance {
  export type Params = {
    id: string;
    storeId: string;
  };

  export type Model = AttendanceModel;
}
