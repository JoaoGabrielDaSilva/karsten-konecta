import { RemoteLinkResponsibleToAttendance } from "../../../data/usecases/attendance/remote-link-responsible-to-attendance";
import { LinkResponsibleToAttendance } from "../../../domain/usecases/attendance/link-responsible-to-attendance";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteLinkResponsibleToAttendance =
  (): LinkResponsibleToAttendance =>
    new RemoteLinkResponsibleToAttendance(
      makeApiUrl("attendance", "/edit-attendance"),
      makeAuthorizeHttpClientDecorator()
    );
