import { RemoteFinishAttendance } from "../../../data/usecases/attendance/remote-finish-attendance";
import { FinishAttendance } from "../../../domain/usecases/attendance/finish-attendance";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteFinishAttendance = (): FinishAttendance =>
  new RemoteFinishAttendance(
    makeApiUrl("attendance", "/finalize-attendance-order"),
    makeAuthorizeHttpClientDecorator()
  );
