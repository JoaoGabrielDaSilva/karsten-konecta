import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { ProductModel } from "../../../domain/models/product";
import { GetProductGrid } from "../../../domain/usecases/product/get-product-grid";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteGetProductGrid implements GetProductGrid {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteGetProductGrid.Model>
  ) {}

  async get({
    code,
    color,
  }: GetProductGrid.Params): Promise<GetProductGrid.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
      params: {
        IdProduto: code,
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        const result = httpResponse.body.Result;
        console.log(result);

        return {
          colorList: result.ListaCores.map((product) => ({
            code: product.IdProduto,
            color: product.Cor,
            uri: product.UrlProduto,
            sizeList: product.ListaTamanhos.map((item) => ({
              code: item.IdProduto,
              size: item.Tamanho,
            })),
          })),
        };

      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteGetProductGrid {
  export type Model = {
    Result: {
      ListaCores: {
        IdProduto: string;
        UrlProduto: string;
        Cor: string;
        ListaTamanhos: {
          IdProduto: string;
          Tamanho: string;
          UrlProduto: string;
        }[];
      }[];
    };
  };
}
