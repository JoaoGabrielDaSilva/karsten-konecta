import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { GetOrderDetails } from "../../../domain/usecases/order/get-order-details";
import { cpfMask } from "../../../presentation/utils/mask/cpf-mask";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteGetOrderDetails implements GetOrderDetails {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteGetOrderDetails.Model>
  ) {}

  async execute({
    attendanceId,
    storeId,
  }: GetOrderDetails.Params): Promise<GetOrderDetails.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
      params: {
        IdAtendimento: attendanceId,
        IdPessoaLoja: storeId,
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        const result = httpResponse.body.Result;
        console.log(result);

        return {
          id: String(result.Id),
          code: result.Codigo,
          createdAt: `${result.DataEmissao} às ${result.HoraEmissao}`,
          customer: {
            name: result.Cliente,
            cpf: cpfMask(result.Cpf),
          },
          isPickUp: result.RetireNaLoja,
          responsibleName: result.Retirante,
          responsibleCpf: result.CpfRetirante,
          address: !result.RetireNaLoja
            ? {
                id: null,
                instructions: null,
                street: result.Logradouro,
                number: result.NumeroLogradouro,
                district: result.Bairro,
                cep: result.CEP,
                city: result.Cidade,
                name: result.NomeEndereco,
                state: result.Estado,
                complement: result.LogradouroComplemento,
                reference: result.Referencia,
              }
            : {
                id: null,
                street: result.EnderecoRetire.Logradouro,
                number: result.EnderecoRetire.LogradouroNumero,
                district: result.EnderecoRetire.Bairro,
                cep: result.EnderecoRetire.Cep,
                city: result.EnderecoRetire.Cidade,
                name: result.EnderecoRetire.NomeEndereco,
                state: result.EnderecoRetire.Uf,
                instructions: result.EnderecoRetire.InstrucoesRetirada,
              },

          deliveryForecast: result.DataPrevisaoEntrega,
          status: result.Status,
          trackingURL: result.LinkRastreio,
          productList: result.ListaItensPedido.map((item) => ({
            name: item.Nome,
            code: item.Codigo,
            ean: item.Ean,
            uri: item.FotoPrincipal,
            amount: item.Quantidade,
          })),
        };

      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteGetOrderDetails {
  export type Model = {
    Result: {
      Bairro: string;
      CEP: string;
      CFOP: string;
      CaneladoParcialmente: false;
      Cidade: string;
      Cliente: string;
      Codigo: string;
      Cpf: string;
      Retirante: string;
      CpfRetirante: string;
      DataAprovacao: string;
      DataEmissao: string;
      DataHoraAprovacao: string;
      DataPrevisaoEntrega: string;
      DiasParaEntrega: number;
      Email: string;
      EnderecoRetire: {
        Bairro: string;
        Cep: string;
        Cidade: string;
        IdPontoRetirada: string;
        InstrucoesRetirada: string;
        Logradouro: string;
        LogradouroNumero: string;
        NomeEndereco: string;
        NomeLoja: string;
        Uf: string;
      };
      Estado: string;
      HoraAprovacao: string;
      HoraEmissao: string;
      HoraPrevisaoEntrega: string;
      Id: number;
      LinkRastreio: string;
      ListaItensPedido: {
        Codigo: string;
        Ean: string;
        FotoPrincipal: string;
        Nome: string;
        Quantidade: 8;
      }[];
      Logradouro: string;
      LogradouroComplemento: string;
      NomeEndereco: string;
      NumeroLogradouro: string;
      Referencia: string;
      RetireNaLoja: boolean;
      Status: string;
      Transportadora: string;
      ValorPedido: number;
      ValorPedidoFormat: number;
    };
  };
}
