import { RemoteCreateCustomer } from "../../../data/usecases/customer/remote-create-customer";
import { CreateCustomer } from "../../../domain/usecases/customer/create-customer";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteCreateCustomer = (): CreateCustomer =>
  new RemoteCreateCustomer(
    makeApiUrl("customer", "/create-customer"),
    makeAuthorizeHttpClientDecorator()
  );
