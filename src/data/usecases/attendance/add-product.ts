import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { AddProduct } from "../../../domain/usecases/attendance/add-product";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteAddProduct implements AddProduct {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async add(params: AddProduct.Params): Promise<AddProduct.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "post",
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
