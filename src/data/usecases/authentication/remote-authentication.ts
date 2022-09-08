import { InvalidCredentialsError } from "../../../domain/errors/invalid-credentials-error";
import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { AccountModel } from "../../../domain/models/account-model";
import { AuthModel } from "../../../domain/models/auth-model";
import { Authentication } from "../../../domain/usecases/authentication/authentication";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteAuthentication.Model>
  ) {}

  async auth(params: Authentication.Params): Promise<Authentication.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "post",
      body: params,
    });

    const userId = httpResponse.body?.Result?.IdUser || null;

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return {
          userId,
        };
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteAuthentication {
  export type Model = {
    Result: {
      IdUser: string;
    };
  };
}
