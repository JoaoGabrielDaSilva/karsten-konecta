import { RemoteDuplicateOrder } from "../../../data/usecases/attendance/remote-copy-attendance";
import { DuplicateOrder } from "../../../domain/usecases/attendance/duplicate-order";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteDuplicateOrder = (): DuplicateOrder =>
  new RemoteDuplicateOrder(
    makeApiUrl("attendance", "/copy-order-attendance"),
    makeAuthorizeHttpClientDecorator()
  );
