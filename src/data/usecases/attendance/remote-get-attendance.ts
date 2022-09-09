import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { GetAttendance } from "../../../domain/usecases/attendance/get-attendance";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteGetAttendance implements GetAttendance {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteGetAttendance.Model>
  ) {}

  async get({
    id,
    storeId,
  }: GetAttendance.Params): Promise<GetAttendance.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
      params: {
        IdAtendimento: id,
        IdPessoaLoja: storeId,
      },
    });

    console.log(httpResponse);

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        const result = httpResponse.body.Result;
        console.log(result);

        return {
          name: result.NomeAtendimento,
          cpfCnpj: result.CpfCnpjConsumidor,
          productList: result.ListaAtendimentoItens.map((product) => ({
            code: product.Produto.Codigo,
            ean: product.Produto.Ean,
            name: product.Produto.Nome,
            uri: product.Produto.FotoPrincipal,
            amount: product.Quantidade,
          })),
          deliveryAddress: result?.EnderecoEntrega
            ? {
                id: String(result.EnderecoEntrega.IdConsumidorLojaEndereco),
                cep: result.EnderecoEntrega.CEP,
                street: result.EnderecoEntrega.Logradouro,
                number: result.EnderecoEntrega.LogradouroNumero,
                city: result.EnderecoEntrega.Cidade,
                district: result.EnderecoEntrega.Bairro,
                name: result.EnderecoEntrega.NomeEndereco,
                state: result.EnderecoEntrega.Estado,
                reference: result.EnderecoEntrega?.Referencia,
                complement: result.EnderecoEntrega?.LogradouroComplemento,
              }
            : null,
        };

      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteGetAttendance {
  export type Model = {
    Result: {
      CpfCnpjConsumidor: string;
      NomeAtendimento: string;
      ListaAtendimentoItens: {
        IdAtendimentoItem: string;
        Produto: {
          Codigo: string;
          Ean: string;
          FotoPrincipal: string;
          Nome: string;
          Peso: number;
          Preco: number;
        };
        Quantidade: number;
      }[];
      EnderecoEntrega: {
        Bairro: string;
        CEP: string;
        Cidade: string;
        Estado: string;
        IdConsumidorLojaEndereco: number;
        Logradouro: string;
        LogradouroComplemento: string;
        LogradouroNumero: string;
        NomeEndereco: string;
        Referencia: string;
      };
    };
  };
}
