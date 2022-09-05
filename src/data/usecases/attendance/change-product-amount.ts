import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { ChangeProductAmount } from "../../../domain/usecases/attendance/change-product-amount";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteChangeProductAmount implements ChangeProductAmount {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async change(
    params: ChangeProductAmount.Params
  ): Promise<ChangeProductAmount.Model[]> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "put",
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      default:
        throw new UnexpectedError();
    }
  }
}
