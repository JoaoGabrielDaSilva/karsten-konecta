import { RemoteAddProduct } from "../../../data/usecases/attendance/remote-add-product";
import { AddProduct } from "../../../domain/usecases/attendance/add-product";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteAddProduct = (): AddProduct =>
  new RemoteAddProduct(
    makeApiUrl("attendance", "/create-item-attendance"),
    makeAuthorizeHttpClientDecorator()
  );
