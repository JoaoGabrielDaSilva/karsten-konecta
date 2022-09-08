import { RemoteGetAttendance } from "../../../data/usecases/attendance/remote-get-attendance";
import { GetAttendance } from "../../../domain/usecases/attendance/get-attendance";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteGetAttendance = (): GetAttendance =>
  new RemoteGetAttendance(
    makeApiUrl("attendance", "/attendance-detail"),
    makeAuthorizeHttpClientDecorator()
  );
