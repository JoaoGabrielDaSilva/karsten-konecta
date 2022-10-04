import { RemoteGetSaleLinkConfiguration } from "../../../data/usecases/sale-link/remote-get-sale-link-configuration";
import { GetSaleLinkConfiguration } from "../../../domain/usecases/sale-link/get-sale-link-configuration";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteGetSaleLinkConfiguration =
  (): GetSaleLinkConfiguration =>
    new RemoteGetSaleLinkConfiguration(
      makeApiUrl("sale-link", "/config-pay-order-cielo"),
      makeAuthorizeHttpClientDecorator()
    );
