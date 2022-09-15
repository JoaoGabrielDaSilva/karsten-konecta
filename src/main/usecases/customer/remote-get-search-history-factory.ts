import { RemoteGetSearchHistory } from "../../../data/usecases/product/remote-get-search-history";
import { GetSearchHistory } from "../../../domain/usecases/product/get-search-history";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteGetSearchHistory = (): GetSearchHistory =>
  new RemoteGetSearchHistory(
    makeApiUrl("product", "/product-historic-search"),
    makeAuthorizeHttpClientDecorator()
  );
