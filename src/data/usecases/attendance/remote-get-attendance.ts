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

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        const result = httpResponse.body.Result;

        return {
          name: result?.Consumidor
            ? result?.Consumidor.NomeConsumidor
            : result.NomeAtendimento,
          hasCustomer: !!result?.Consumidor?.CpfConsumidor,
          customer: result?.Consumidor
            ? {
                cpfCnpj: result.Consumidor.CpfConsumidor,
                id: result.Consumidor?.IdCosumidor,
                name: result.Consumidor.NomeConsumidor,
              }
            : null,
          cpfCnpj:
            result?.CpfCnpjConsumidor || result?.Consumidor?.CpfConsumidor,
          productList: result.ListaAtendimentoItens.map((product) => ({
            id: String(product.IdAtendimentoItem),
            code: product.Produto.Codigo,
            ean: product.Produto.Ean,
            name: product.Produto.Nome,
            uri: product.Produto.FotoPrincipal,
            amount: product.Quantidade,
            weight: Number(product.Produto.Peso),
            price: product.Produto.Preco,
            totalPrice: product.Produto.TotalItem,
            totalWeight: product.Quantidade * Number(product.Produto.Peso),
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
          ...(result?.EnderecoRetireLoja
            ? {
                pickUpAddress: {
                  id: result?.EnderecoRetireLoja?.IdPontoRetirada,
                  name: result?.EnderecoRetireLoja?.NomeLoja,
                  cep: result?.EnderecoRetireLoja?.Cep,
                  street: result?.EnderecoRetireLoja?.Logradouro,
                  number: result?.EnderecoRetireLoja?.LogradouroNumero,
                  district: result?.EnderecoRetireLoja?.Bairro,
                  city: result?.EnderecoRetireLoja?.Cidade,
                  state: result?.EnderecoRetireLoja?.Uf,
                  instructions: result?.EnderecoRetireLoja?.InstrucoesRetirada,
                },
              }
            : {}),
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
      Consumidor: {
        IdCosumidor: string;
        CpfConsumidor: string;
        NomeConsumidor: string;
      };
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
          TotalItem: number;
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
      EnderecoRetireLoja: {
        IdPontoRetirada: string;
        NomeLoja: string;
        Cep: string;
        Logradouro: string;
        LogradouroNumero: string;
        Bairro: string;
        Cidade: string;
        Uf: string;
        InstrucoesRetirada: string;
      };
    };
  };
}
