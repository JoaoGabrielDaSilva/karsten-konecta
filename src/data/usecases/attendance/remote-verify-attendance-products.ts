import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { SalesModality } from "../../../domain/models/attendance";
import { CopyAttendance } from "../../../domain/usecases/attendance/copy-attendance";
import { VerifyAttendanceProducts } from "../../../domain/usecases/attendance/verify-attendance-products";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteVerifyAttendanceProducts
  implements VerifyAttendanceProducts
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteVerifyAttendanceProducts.Model>
  ) {}

  async execute({
    attendanceId,
    saleModality = SalesModality.InfiniteShelf,
    storeId,
    shouldSave = false,
  }: VerifyAttendanceProducts.Params): Promise<VerifyAttendanceProducts.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
      body: {
        IdAtendimento: attendanceId,
        IdPessoaLoja: storeId,
        ModalidadeVenda: saleModality,
        Salvar: shouldSave,
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return {
          updatedProducts: [],
          deletedProducts: [],
        };
      case HttpStatusCode.notFound:
        const result = httpResponse.body.Result;

        return {
          updatedProducts: result?.ListaAtualizados.map((item) => ({
            name: item.NomeProduto,
            code: item.Codigo,
            uri: item.Url,
            ean: item.Ean,
            availableAmount: item.Quantidade,
          })),
          deletedProducts: result.ListaRemovidos.map((item) => ({
            name: item.NomeProduto,
            code: item.Codigo,
            uri: item.Url,
            ean: item.Ean,
          })),
        };
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteVerifyAttendanceProducts {
  export type Model = {
    Result: {
      ListaAtualizados: {
        NomeProduto: string;
        Codigo: string;
        Url: string;
        Ean: string;
        Quantidade: number;
      }[];
      ListaRemovidos: {
        NomeProduto: string;
        Codigo: string;
        Url: string;
        Ean: string;
      }[];
    };
  };
}
