import { RemoteGetProductCategories } from "../../../data/usecases/product/remote-get-product-categories";
import { GetProductCategories } from "../../../domain/usecases/product/get-product-categories";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteGetProductCategories = (): GetProductCategories =>
  new RemoteGetProductCategories(
    makeApiUrl("product", "/product-category"),
    makeAuthorizeHttpClientDecorator()
  );
