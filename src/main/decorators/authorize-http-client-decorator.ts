import { addSeconds, isAfter, subHours } from "date-fns";

import {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from "../../data/protocols/http/http-client";
import { RemoteGetAuthenticationToken } from "../../data/usecases/authentication/remote-get-authentication-token";
import { AsyncStorageAdapter } from "../../infra/protocols/cache/async-storage-adapter";

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor(
    private readonly asyncStorage: AsyncStorageAdapter,
    private readonly getAuthenticationToken: RemoteGetAuthenticationToken,
    private readonly httpClient: HttpClient
  ) {}

  async request(data: HttpRequest): Promise<HttpResponse> {
    const accessToken = await this.asyncStorage.get("accessToken");
    const userId = await this.asyncStorage.get("userId");

    if (!accessToken || (await this.isTokenExpired())) {
      await this.refreshAccessToken();
      return this.request(data);
    }

    const headers = {
      "x-api-key": "4loZGJ5Nw76xEvh7bpN8941ji26JpbqN6sfPtag1",
    };

    if (accessToken) {
      Object.assign(headers, {
        Authorization: `Bearer ${accessToken}`,
      });
    }

    if (userId) {
      Object.assign(headers, {
        "K-IdUser": userId,
      });
    }

    const httpResponse = await this.httpClient.request({ ...data, headers });
    return httpResponse;
  }

  async isTokenExpired(): Promise<boolean> {
    const expireDate = await this.asyncStorage.get("tokenExpireDate");

    if (
      !expireDate ||
      (expireDate &&
        isAfter(new Date().getTime(), new Date(expireDate).getTime()))
    ) {
      await this.asyncStorage.set("accessToken", null);
      console.log("TOKEN EXPIRADO\nRENOVANDO...");

      return true;
    }
    return false;
  }

  async refreshAccessToken(): Promise<void> {
    const response = await this.getAuthenticationToken.get();

    const { accessToken, expiresIn } = response;

    const tokenExpireDate = addSeconds(new Date(), expiresIn).getTime();
    await this.asyncStorage.set("accessToken", accessToken);
    await this.asyncStorage.set("tokenExpireDate", tokenExpireDate);

    console.log("Token irá expirar em: ", new Date(tokenExpireDate));
    console.log("TOKEN:  ", accessToken);
  }
}
