import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { GetSaleLinkConfiguration } from "../../../domain/usecases/sale-link/get-sale-link-configuration";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteGetSaleLinkConfiguration
  implements GetSaleLinkConfiguration
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteGetSaleLinkConfiguration.Model>
  ) {}

  async execute({
    storeId,
  }: GetSaleLinkConfiguration.Params): Promise<GetSaleLinkConfiguration.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
      params: {
        idPessoaLoja: storeId,
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        const result = httpResponse.body?.Result;

        return {
          saleTypeList: result.TipoVenda.map((item) => ({
            default: item.Default,
            value: item.Valor,
          })),
        };
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteGetSaleLinkConfiguration {
  export type Model = {
    Result: {
      TipoVenda: {
        Default: boolean;
        Valor: string;
      }[];
    };
  };
}
