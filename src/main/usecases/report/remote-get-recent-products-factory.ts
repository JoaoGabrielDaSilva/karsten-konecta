import { RemoteGetRecentProducts } from "../../../data/usecases/report/remote-get-recent-products";
import { GetRecentProducts } from "../../../domain/usecases/report/get-recent-products";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteGetRecentProducts = (): GetRecentProducts =>
  new RemoteGetRecentProducts(
    makeApiUrl("reports", "/showcase-product"),
    makeAuthorizeHttpClientDecorator()
  );
