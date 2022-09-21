import { RemoteGetBestSellersProducts } from "../../../data/usecases/report/remote-get-best-sellers-products";
import { GetBestSellersProducts } from "../../../domain/usecases/report/get-best-sellers-products";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteGetBestSellersProducts = (): GetBestSellersProducts =>
  new RemoteGetBestSellersProducts(
    makeApiUrl("reports", "/showcase-sold-product"),
    makeAuthorizeHttpClientDecorator()
  );
