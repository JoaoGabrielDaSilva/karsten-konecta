import { makeApiUrl } from "../../factories/http/make-api-url";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { GetProductStock } from "../../../domain/usecases/stock/get-product-stock";
import { RemoteGetProductStock } from "../../../data/usecases/stock/remote-get-product-stock";

export const makeRemoteGetProductStock = (): GetProductStock =>
  new RemoteGetProductStock(
    makeApiUrl("stock", "/stock-app-product-by-ean"),
    makeAuthorizeHttpClientDecorator()
  );
