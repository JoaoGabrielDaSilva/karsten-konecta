import { RemoteGetOrderList } from "../../../data/usecases/attendance/remote-get-order-list";
import { GetOrderList } from "../../../domain/usecases/attendance/get-order-list";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteOrderList = (): GetOrderList =>
  new RemoteGetOrderList(
    makeApiUrl("attendance", "/order-fullsearch-list"),
    makeAuthorizeHttpClientDecorator()
  );
