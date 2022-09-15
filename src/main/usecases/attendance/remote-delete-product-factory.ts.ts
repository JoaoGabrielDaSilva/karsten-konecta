import { RemoteDeleteProduct } from "../../../data/usecases/attendance/remote-delete-product";
import { DeleteProduct } from "../../../domain/usecases/attendance/delete-product";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteDeleteProduct = (): DeleteProduct =>
  new RemoteDeleteProduct(
    makeApiUrl("attendance", "/delete-item-attendance"),
    makeAuthorizeHttpClientDecorator()
  );
