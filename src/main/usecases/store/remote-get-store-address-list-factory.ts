import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";
import { GetStoreAddressList } from "../../../domain/usecases/store/get-store-address-list";
import { RemoteGetStoreAddressList } from "../../../data/usecases/store/remote-get-store-address-list";

export const makeRemoteGetStoreAddressList = (): GetStoreAddressList =>
  new RemoteGetStoreAddressList(
    makeApiUrl("store", "/list-pick-up-point"),
    makeAuthorizeHttpClientDecorator()
  );
