import { RemoteUpdateAttendancePickUpAddress } from "../../../data/usecases/attendance/remote-update-attendance-pickup-address";
import { UpdateAttendancePickUpAddress } from "../../../domain/usecases/attendance/update-attendance-pickup-address";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteUpdatePickupAddress =
  (): UpdateAttendancePickUpAddress =>
    new RemoteUpdateAttendancePickUpAddress(
      makeApiUrl("attendance", "/edit-attendance"),
      makeAuthorizeHttpClientDecorator()
    );
