import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { GetAuthenticationToken } from "../../../domain/usecases/authentication/get-authentication-token";
import {
  HttpClient,
  HttpResponse,
  HttpStatusCode,
} from "../../protocols/http/http-client";

export class RemoteGetAuthenticationToken implements GetAuthenticationToken {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteGetAuthenticationToken.Model>
  ) {}

  async get(): Promise<GetAuthenticationToken.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "post",
      headers: {
        "x-api-key": "4loZGJ5Nw76xEvh7bpN8941ji26JpbqN6sfPtag1",
        Authorization:
          "Basic dUxxcXo3UEo0WFFDcGd0OTo5WlI5QUIyUlVKa2hKM0tqLUFQUC1ESUdJVEFM",
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        const result = httpResponse.body.Result;
        return {
          accessToken: result.AccessToken,
          expiresIn: result.ExpiresIn,
        };
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteGetAuthenticationToken {
  export type Model = {
    Result: {
      ExpiresIn: number;
      AccessToken: string;
    };
  };
}
