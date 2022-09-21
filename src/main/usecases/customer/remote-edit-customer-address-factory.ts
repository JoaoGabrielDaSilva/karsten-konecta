import { RemoteEditCustomerAddress } from "../../../data/usecases/customer/remote-edit-customer-address";
import { EditCustomerAddress } from "../../../domain/usecases/customer/edit-customer-address";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteEditCustomerAddress = (): EditCustomerAddress =>
  new RemoteEditCustomerAddress(
    makeApiUrl("customer", "/edit-address-customer"),
    makeAuthorizeHttpClientDecorator()
  );
