import { GetUserData } from "../../../domain/usecases/user/get-user-data";
import { RemoteGetUserData } from "../../../data/usecases/user/remote-get-user-data";
import { makeApiUrl } from "../../factories/http/make-api-url";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";

export const makeRemoteGetUserData = (): GetUserData =>
  new RemoteGetUserData(
    makeApiUrl("user", "/user-detail"),
    makeAuthorizeHttpClientDecorator()
  );
