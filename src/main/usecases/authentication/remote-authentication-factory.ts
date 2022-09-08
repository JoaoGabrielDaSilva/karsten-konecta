import { makeApiUrl } from "../../factories/http/make-api-url";
import { RemoteAuthentication } from "../../../data/usecases/authentication/remote-authentication";
import { Authentication } from "../../../domain/usecases/authentication/authentication";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";

export const makeRemoteAuthentication = (): Authentication =>
  new RemoteAuthentication(
    makeApiUrl("login", "/sign-in"),
    makeAuthorizeHttpClientDecorator()
  );
