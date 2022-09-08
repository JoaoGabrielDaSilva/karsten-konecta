import { RemoteGetProductGrid } from "../../../data/usecases/product/remote-get-product-grid";
import { GetProductGrid } from "../../../domain/usecases/product/get-product-grid";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteGetProductGrid = (): GetProductGrid =>
  new RemoteGetProductGrid(
    makeApiUrl("product", "/product-grid"),
    makeAuthorizeHttpClientDecorator()
  );
