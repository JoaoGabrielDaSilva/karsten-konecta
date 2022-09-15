import { makeApiUrl } from "../../factories/http/make-api-url";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { GetStoreList } from "../../../domain/usecases/store/get-store-list";
import { RemoteGetStoreList } from "../../../data/usecases/store/remote-get-store-list";

export const makeRemoteGetStoreList = (): GetStoreList =>
  new RemoteGetStoreList(
    makeApiUrl("store", "/list-complementary-info"),
    makeAuthorizeHttpClientDecorator()
  );
