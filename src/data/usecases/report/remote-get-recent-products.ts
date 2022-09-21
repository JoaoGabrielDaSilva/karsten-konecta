import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { GetRecentProducts } from "../../../domain/usecases/report/get-recent-products";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteGetRecentProducts implements GetRecentProducts {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteGetRecentProducts.Model>
  ) {}

  async execute({
    storeId,
    filter,
    type,
  }: GetRecentProducts.Params): Promise<GetRecentProducts.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
      params: {
        Filter: filter,
        Tipo: type,
        IdPessoaLoja: storeId,
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        const result = httpResponse.body?.Result;

        return {
          recentProducts: result.ListaMaisVistos.map((product) => ({
            code: product.Codigo,
            ean: product.Ean,
            name: product.Nome,
            uri: product.FotoPrincipal,
          })),
        };
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteGetRecentProducts {
  export type Model = {
    Result: {
      ListaMaisVistos: {
        Codigo: string;
        Ean: string;
        FotoPrincipal: string;
        Nome: string;
      }[];
    };
  };
}
