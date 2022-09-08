import { RemoteGetProductDetails } from "../../../data/usecases/product/remote-get-product-details";
import { GetProductDetails } from "../../../domain/usecases/product/get-product-details";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteGetProductDetails = (): GetProductDetails =>
  new RemoteGetProductDetails(
    makeApiUrl("product", "/product-details"),
    makeAuthorizeHttpClientDecorator()
  );
