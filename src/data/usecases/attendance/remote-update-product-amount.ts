import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { UpdateProductAmount } from "../../../domain/usecases/attendance/update-product-amount";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteUpdateProductAmount implements UpdateProductAmount {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteUpdateProductAmount.Model>
  ) {}

  async execute({
    id,
    storeId,
    sum,
  }: UpdateProductAmount.Params): Promise<UpdateProductAmount.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "put",
      body: {
        IdAtendimentoItem: id,
        SomarItem: sum.toString(),
        IdPessoaLoja: storeId,
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        const result = httpResponse.body.Result;
        return {
          id: String(result.IdAtendimentoItem),
          totalAmount: result.Quantidade,
        };
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteUpdateProductAmount {
  export type Model = {
    Result: {
      IdAtendimentoItem: number;
      Quantidade: number;
    };
  };
}
