import { RemoteVerifyAttendanceProducts } from "../../../data/usecases/attendance/remote-verify-attendance-products";
import { VerifyAttendanceProducts } from "../../../domain/usecases/attendance/verify-attendance-products";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteVerifyAttendanceProducts =
  (): VerifyAttendanceProducts =>
    new RemoteVerifyAttendanceProducts(
      makeApiUrl("attendance", "/attendance-verify-itens"),
      makeAuthorizeHttpClientDecorator()
    );
