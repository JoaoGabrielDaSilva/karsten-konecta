import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { GetSearchHistory } from "../../../domain/usecases/product/get-search-history";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteGetSearchHistory implements GetSearchHistory {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteGetSearchHistory.Model>
  ) {}

  async execute({
    storeId,
    type,
  }: GetSearchHistory.Params): Promise<GetSearchHistory.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
      params: {
        idPessoaLoja: storeId,
        tipo: type,
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return {
          searchHistory: httpResponse.body.Result.ListaPesquisaRecentes.map(
            (item) => ({ label: item.Termo })
          ),
        };

      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteGetSearchHistory {
  export type Model = {
    Result: {
      ListaPesquisaRecentes: {
        Termo: string;
      }[];
    };
  };
}
