import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { GetBestSellersProducts } from "../../../domain/usecases/report/get-best-sellers-products";
import { GetRecentProducts } from "../../../domain/usecases/report/get-recent-products";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteGetBestSellersProducts implements GetBestSellersProducts {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteGetBestSellersProducts.Model>
  ) {}

  async execute({
    storeId,
    filter,
    type,
  }: GetBestSellersProducts.Params): Promise<GetBestSellersProducts.Model> {
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
          bestSellers: result.ListaMaisVendidos.map((product) => ({
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

export namespace RemoteGetBestSellersProducts {
  export type Model = {
    Result: {
      ListaMaisVendidos: {
        Codigo: string;
        Ean: string;
        FotoPrincipal: string;
        Nome: string;
      }[];
    };
  };
}
