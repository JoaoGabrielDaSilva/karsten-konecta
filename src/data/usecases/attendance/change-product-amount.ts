import { ProductModel } from "../../../domain/models/product";
import {
  ChangeProductAmount,
  ChangeProductAmountParams,
} from "../../../domain/usecases/attendance/change-product-amount";
import {
  HttpGetClient,
  HttpStatusCode,
} from "../../protocols/http/http-get-client";

export class RemoteChangeProductAmount implements ChangeProductAmount {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpGetClient
  ) {}

  async change(params: ChangeProductAmountParams): Promise<ProductModel[]> {
    const httpResponse = await this.httpClient.get({ url: this.url, params });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.notFound:
        throw new Error("Erro ao atualizar quantidade do Produto!");
    }
  }
}
