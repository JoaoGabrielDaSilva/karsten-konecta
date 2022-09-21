import { RemoteEditCustomer } from "../../../data/usecases/customer/remote-edit-customer";
import { EditCustomer } from "../../../domain/usecases/customer/edit-customer";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteEditCustomer = (): EditCustomer =>
  new RemoteEditCustomer(
    makeApiUrl("customer", "/edit-customer"),
    makeAuthorizeHttpClientDecorator()
  );
