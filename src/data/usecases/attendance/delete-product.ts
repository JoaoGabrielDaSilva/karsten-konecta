import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { DeleteProduct } from "../../../domain/usecases/attendance/delete-product";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteDeleteProduct implements DeleteProduct {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async delete(params: DeleteProduct.Params): Promise<DeleteProduct.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "delete",
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
