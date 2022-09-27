import { RemoteGetOrderDetails } from "../../../data/usecases/order/remote-get-order-details";
import { GetOrderDetails } from "../../../domain/usecases/order/get-order-details";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteGetOrderDetails = (): GetOrderDetails =>
  new RemoteGetOrderDetails(
    makeApiUrl("order", "/attendance-order-detail"),
    makeAuthorizeHttpClientDecorator()
  );
