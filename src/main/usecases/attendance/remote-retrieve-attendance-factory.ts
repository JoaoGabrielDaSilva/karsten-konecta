import { RemoteRetrieveAttendance } from "../../../data/usecases/attendance/remote-retrieve-attendance";
import { RetrieveAttendance } from "../../../domain/usecases/attendance/retrieve-attendance";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteRetrieveAttendance = (): RetrieveAttendance =>
  new RemoteRetrieveAttendance(
    makeApiUrl("attendance", "/attendance-customer-restore"),
    makeAuthorizeHttpClientDecorator()
  );
