import { RemoteUpdateProductAmount } from "../../../data/usecases/attendance/remote-update-product-amount";
import { UpdateProductAmount } from "../../../domain/usecases/attendance/update-product-amount";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteUpdateProductAmount = (): UpdateProductAmount =>
  new RemoteUpdateProductAmount(
    makeApiUrl("attendance", "/edit-item-attendance"),
    makeAuthorizeHttpClientDecorator()
  );
