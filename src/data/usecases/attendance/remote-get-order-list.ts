import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { GetOrderList } from "../../../domain/usecases/attendance/get-order-list";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteGetOrderList implements GetOrderList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteGetOrderList.Model>
  ) {}

  async execute({
    storeId,
    page,
    code,
    cpfCnpj,
    createDate,
    customerName,
    status,
    saleLinkStatus,
    modality,
  }: GetOrderList.Params): Promise<GetOrderList.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
      params: {
        IdPessoaLoja: storeId,
        Page: page,
        CodigoPedido: code,
        Cpf: cpfCnpj,
        NomeCliente: customerName,
        DataCriacao: createDate,
        Modalidade: modality,
        ...(saleLinkStatus
          ? { CodigoStatusVendaLink: saleLinkStatus }
          : { Status: status }),
        Status: status,
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        const result = httpResponse.body.Result;

        return {
          orderList: result.ListaPedidos.map((item) => ({
            attendanceId: item.IdAtendimentoApp,
            orderCode: item.CodigoPedido,
            approvedAt: item.DataHoraAprovacao,
            createdAt: item.DataCriacao,
            customerName: item.Cliente,
            totalProductsIn: item.QuantidadeItens,
            status: item.Status,
          })),
          totalResults: result.TotalRegistros,
        };

      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteGetOrderList {
  export type Model = {
    Result: {
      ListaPedidos: {
        Cliente: string;
        CodigoPedido: string;
        DataCriacao: string;
        IdAtendimentoApp: string;
        QuantidadeItens: string;
        Status: string;
        DataHoraAprovacao: string;
      }[];
      TotalRegistros: number;
    };
  };
}
