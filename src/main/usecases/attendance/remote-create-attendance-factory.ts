import { RemoteCreateAttendance } from "../../../data/usecases/attendance/remote-create-attendance";
import { CreateAttendance } from "../../../domain/usecases/attendance/create-attendance";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteCreateAttendance = (): CreateAttendance =>
  new RemoteCreateAttendance(
    makeApiUrl("attendance", "/create-attendance"),
    makeAuthorizeHttpClientDecorator()
  );
