import { RemoteGetCustomer } from "../../../data/usecases/customer/remote-get-customer";
import { GetCustomer } from "../../../domain/usecases/customer/get-customer";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteGetCustomer = (): GetCustomer =>
  new RemoteGetCustomer(
    makeApiUrl("customer", "/customer-detail"),
    makeAuthorizeHttpClientDecorator()
  );
