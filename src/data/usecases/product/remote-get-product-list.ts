import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { ProductModel } from "../../../domain/models/product";
import { GetProductList } from "../../../domain/usecases/product/get-product-list";
import { MenuItem } from "../../../presentation/screens/sales/styles";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteGetProductList implements GetProductList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteGetProductList.Model>
  ) {}

  async get({
    page,
    query,
    order,
    category,
    brandId,
    storeId,
  }: GetProductList.Params): Promise<GetProductList.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
      params: {
        page,
        filter: query,
        order,
        categoria: category,
        idMarca: brandId,
        idPessoaLoja: storeId,
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return {
          productList: httpResponse.body.Result.ListaProdutos.map(
            (product) => ({
              name: product.Nome,
              code: product.Codigo,
              ean: product.Ean,
              uri: product.FotoPrincipal,
              hasAvailableAmount: product.EstoqueDisponivel === "True",
            })
          ),
          totalResults: httpResponse.body.Result.TotalRegistros,
        };

      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteGetProductList {
  export type Model = {
    Result: {
      ListaProdutos: {
        EstoqueDisponivel: string;
        Codigo: string;
        Ean: string;
        Nome: string;
        FotoPrincipal: string;
      }[];
      TotalRegistros: number;
    };
  };
}
