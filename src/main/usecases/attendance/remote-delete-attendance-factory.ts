import { RemoteDeleteAttendance } from "../../../data/usecases/attendance/remote-delete-attendance";
import { DeleteAttendance } from "../../../domain/usecases/attendance/delete-attendance";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteDeleteAttendance = (): DeleteAttendance =>
  new RemoteDeleteAttendance(
    makeApiUrl("attendance", "/delete-attendance"),
    makeAuthorizeHttpClientDecorator()
  );
