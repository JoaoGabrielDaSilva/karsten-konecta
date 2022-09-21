import { RemoteCreateCustomerAddress } from "../../../data/usecases/customer/remote-create-customer-address";
import { CreateCustomerAddress } from "../../../domain/usecases/customer/create-customer-address";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteCreateCustomerAddress = (): CreateCustomerAddress =>
  new RemoteCreateCustomerAddress(
    makeApiUrl("customer", "/create-address-customer"),
    makeAuthorizeHttpClientDecorator()
  );
