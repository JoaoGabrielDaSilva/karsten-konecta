import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { DeleteProduct } from "../../../domain/usecases/attendance/delete-product";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteDeleteProduct implements DeleteProduct {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteDeleteProduct.Model>
  ) {}

  async execute({
    id,
    storeId,
  }: DeleteProduct.Params): Promise<DeleteProduct.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "delete",
      body: {
        IdAtendimentoItem: id,
        IdPessoaLoja: storeId,
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return {
          deletedProductId: id,
        };
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteDeleteProduct {
  export type Model = null;
}
