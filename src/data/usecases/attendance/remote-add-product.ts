import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { AddProduct } from "../../../domain/usecases/attendance/add-product";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteAddProduct implements AddProduct {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteAddProduct.Model>
  ) {}

  async add({
    attendanceId,
    productId,
    amount,
    storeId,
  }: AddProduct.Params): Promise<AddProduct.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "post",
      body: {
        IdAtendimento: attendanceId,
        IdProduto: productId,
        Quantidade: amount,
        IdPessoaLoja: storeId,
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        console.log(httpResponse.body);
        const result = httpResponse.body.Result;
        return {
          id: String(result.Id),
          addedAmount: result.QuantidadeAdicionada,
          totalPrice: result.TotalItem,
        };
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteAddProduct {
  export type Model = {
    Result: {
      QuantidadeAdicionada: number;
      Id: number;
      TotalItem: number;
    };
  };
}
