import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { GetProductStock } from "../../../domain/usecases/stock/get-product-stock";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteGetProductStock implements GetProductStock {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteGetProductStock.Model>
  ) {}

  async execute({
    ean,
  }: GetProductStock.Params): Promise<GetProductStock.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
      params: {
        ean,
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        const result = httpResponse.body?.Result;

        return {
          stockList: result.map((item) => ({
            locale: item.LocalEstoque,
            availableAmount: item.QuantidadeDisponivel,
          })),
        };
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteGetProductStock {
  export type Model = {
    Result: {
      LocalEstoque: string;
      QuantidadeDisponivel: number;
    }[];
  };
}
