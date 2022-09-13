import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { GetAttendanceList } from "../../../domain/usecases/attendance/get-attendance-list";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteGetAttendanceList implements GetAttendanceList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteGetAttendanceList.Model>
  ) {}

  async execute({
    page,
    storeId,
    cpfCnpj,
    endDate,
    initialDate,
    name,
  }: GetAttendanceList.Params): Promise<GetAttendanceList.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
      params: {
        Page: page,
        IdPessoaLoja: storeId,
        CPF: cpfCnpj,
        Nome: name,
        DataCriacaoInicial: initialDate,
        DataCriacaoFinal: endDate,
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        const result = httpResponse.body.Result;

        return {
          attendanceList: result.ListaAtendimentos.map((item) => {
            const lastAddedProduct = item.UltimoProduto;

            return {
              id: String(item.IdAtendimentoApp),
              cpfCnpj: item?.Consumidor?.Cpf || item?.CpfCnpjConsumidor,
              createdAt: item.DataCriacao,
              name: item?.Consumidor?.NomeConsumidor || item.Descricao,
              totalProductsInCart: item.TotalItensCarrinho,
              lastAddedProduct: lastAddedProduct
                ? {
                    name: lastAddedProduct.Nome,
                    code: lastAddedProduct.Codigo,
                    ean: lastAddedProduct.Ean,
                    uri: lastAddedProduct.FotoPrincipal,
                    amount: item.TotalItensProduto,
                  }
                : null,
            };
          }),
          totalResults: result.TotalRegistros,
        };

      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteGetAttendanceList {
  export type Model = {
    Result: {
      ListaAtendimentos: {
        IdAtendimentoApp: string;
        Consumidor: {
          IdConsumidor: string;
          NomeConsumidor: string;
          Cpf: string;
        };
        Descricao: string;
        DataCriacao: string;
        CpfCnpjConsumidor: string;
        UltimoProduto: {
          Nome: string;
          Codigo: string;
          Ean: string;
          FotoPrincipal: string;
        };
        TotalItensCarrinho: number;
        TotalItensProduto: number;
      }[];
      TotalRegistros: number;
    };
  };
}
