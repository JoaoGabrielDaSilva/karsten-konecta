import { GetCustomerAddressList } from "../../../domain/usecases/customer/get-customer-address-list";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";
import { RemoteGetCustomerAddressList } from "../../../data/usecases/customer/remote-get-customer-address-list";

export const makeRemoteGetCustomerAddressList = (): GetCustomerAddressList =>
  new RemoteGetCustomerAddressList(
    makeApiUrl("customer", "/customer-address-list"),
    makeAuthorizeHttpClientDecorator()
  );
