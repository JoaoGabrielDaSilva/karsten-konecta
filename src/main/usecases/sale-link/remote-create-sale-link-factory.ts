import { RemoteCreateSaleLink } from "../../../data/usecases/sale-link/remote-create-sale-link";
import { CreateSaleLink } from "../../../domain/usecases/sale-link/create-sale-link";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteCreateSaleLink = (): CreateSaleLink =>
  new RemoteCreateSaleLink(
    makeApiUrl("sale-link", "/create-link-pay-order-cielo"),
    makeAuthorizeHttpClientDecorator()
  );
