import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { GetProductCategories } from "../../../domain/usecases/product/get-product-categories";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteGetProductCategories implements GetProductCategories {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteGetProductCategories.Model>
  ) {}

  async execute(): Promise<GetProductCategories.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        const result = httpResponse.body.Result;

        return {
          categories: result.ListaCategoria.map((item) => ({
            label: item.Descricao,
            value: item.Descricao,
          })),
        };

      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteGetProductCategories {
  export type Model = {
    Result: {
      ListaCategoria: { Descricao: string }[];
    };
  };
}
