import { makeApiUrl } from "../http/make-api-url";
import { RemoteGetAuthenticationToken } from "../../../data/usecases/authentication/remote-get-authentication-token";
import { AuthorizeHttpClientDecorator } from "../../decorators/authorize-http-client-decorator";
import { makeAsyncStorageAdapter } from "../cache/local-storage-adapter-factory";
import { makeAxiosHttpClient } from "../http/axios-http-client-factory";

export const makeAuthorizeHttpClientDecorator =
  (): AuthorizeHttpClientDecorator => {
    const httpClient = makeAxiosHttpClient();

    return new AuthorizeHttpClientDecorator(
      makeAsyncStorageAdapter(),
      new RemoteGetAuthenticationToken(
        makeApiUrl("auth", "/token"),
        httpClient
      ),
      httpClient
    );
  };
