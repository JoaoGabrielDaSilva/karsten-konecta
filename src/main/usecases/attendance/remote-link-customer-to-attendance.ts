import { RemoteLinkCustomerToAttendance } from "../../../data/usecases/attendance/remote-link-customer-to-attendance";
import { LinkCustomerToAttendance } from "../../../domain/usecases/attendance/link-customer-to-attendance";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteLinkCustomerToAttendance =
  (): LinkCustomerToAttendance =>
    new RemoteLinkCustomerToAttendance(
      makeApiUrl("attendance", "/edit-attendance"),
      makeAuthorizeHttpClientDecorator()
    );
