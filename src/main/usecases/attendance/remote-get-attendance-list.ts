import { RemoteGetAttendanceList } from "../../../data/usecases/attendance/remote-get-attendance-list";
import { GetAttendanceList } from "../../../domain/usecases/attendance/get-attendance-list";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteGetAttendanceList = (): GetAttendanceList =>
  new RemoteGetAttendanceList(
    makeApiUrl("attendance", "/attendance-fullsearch-list"),
    makeAuthorizeHttpClientDecorator()
  );
