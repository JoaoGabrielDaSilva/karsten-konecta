import { RemoteGetShippingInfo } from "../../../data/usecases/shipping/remote-get-shipping-info";
import { GetShippingInfo } from "../../../domain/usecases/shipping/get-shipping-info";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteGetShippingInfo = (): GetShippingInfo =>
  new RemoteGetShippingInfo(
    makeApiUrl("shipping", "/shipping-options"),
    makeAuthorizeHttpClientDecorator()
  );
