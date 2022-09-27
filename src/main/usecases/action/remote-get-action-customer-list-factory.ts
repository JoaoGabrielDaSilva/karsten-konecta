import { RemoteGetActionCustomerList } from "../../../data/usecases/actions/remote-get-action-customer-list";
import { GetActionCustomerList } from "../../../domain/usecases/action/get-action-customer-list";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteGetActionCustomerList = (): GetActionCustomerList =>
  new RemoteGetActionCustomerList(
    makeApiUrl("customer", "/customer-list"),
    makeAuthorizeHttpClientDecorator()
  );
