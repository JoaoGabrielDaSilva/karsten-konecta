import { RemoteGetActionCustomerDetails } from "../../../data/usecases/actions/remote-get-action-customer-details";
import { GetActionCustomerDetails } from "../../../domain/usecases/action/get-action-customer-details";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteGetAtionCustomerDetails = (): GetActionCustomerDetails =>
  new RemoteGetActionCustomerDetails(
    makeApiUrl("action", "/customer-detail"),
    makeAuthorizeHttpClientDecorator()
  );
