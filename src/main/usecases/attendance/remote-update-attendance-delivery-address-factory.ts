import { RemoteUpdateAttendanceDeliveryAddress } from "../../../data/usecases/attendance/remote-update-attendance-delivery-address";
import { UpdateAttendanceDeliveryAddress } from "../../../domain/usecases/attendance/update-attendance-delivery-address";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteUpdateDeliveryAddress =
  (): UpdateAttendanceDeliveryAddress =>
    new RemoteUpdateAttendanceDeliveryAddress(
      makeApiUrl("attendance", "/edit-attendance"),
      makeAuthorizeHttpClientDecorator()
    );
