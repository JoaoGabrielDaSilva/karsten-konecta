import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { GetStoreList } from "../../../domain/usecases/store/get-store-list";
import { StoreModel } from "../../../presentation/models/Store";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteGetStoreList implements GetStoreList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteGetStoreList.Model>
  ) {}

  async execute({
    page,
    cnpj,
    name,
  }: GetStoreList.Params): Promise<GetStoreList.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
      params: {
        page,
        nome: name,
        cnpj,
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        const result = httpResponse.body?.Result;

        return {
          storeList: result.Lojas.map(
            (item) =>
              ({
                id: String(item.IdLoja),
                name: item.Apelido,
                corporateName: item.RazaoSocial,
                cnpj: item.CnpjLoja,
                hasAcceptedMembershipTerm: item?.TermoAdesaoPrateleira,
                isMultiBrand: item?.IndicaMultiMarca,
                saleModalityId: String(item?.IdModalidadeVenda),
                adhesionModalityId: String(item?.IdModalidadeAdesao),
              } as StoreModel)
          ),
          totalResults: result.TotalRegistro,
        };
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteGetStoreList {
  export type Model = {
    Result: {
      Lojas: {
        Apelido: string;
        RazaoSocial: string;
        CnpjLoja: string;
        IdLoja: string;
        TermoAdesaoPrateleira: boolean;
        IndicaMultiMarca: boolean;
        IdModalidadeVenda: string;
        IdModalidadeAdesao: string;
      }[];
      TotalRegistro: number;
    };
  };
}
