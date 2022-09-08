import { RemoteGetProductList } from "../../../data/usecases/product/remote-get-product-list";
import { GetProductList } from "../../../domain/usecases/product/get-product-list";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteGetProductList = (): GetProductList =>
  new RemoteGetProductList(
    makeApiUrl("product", "/product-fullsearch-list"),
    makeAuthorizeHttpClientDecorator()
  );
