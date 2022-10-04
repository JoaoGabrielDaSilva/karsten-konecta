import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { FinishAttendance } from "../../../domain/usecases/attendance/finish-attendance";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteFinishAttendance implements FinishAttendance {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteFinishAttendance.Model>
  ) {}

  async execute({
    storeId,
    attendanceId,
    shipping,
    isSaleLink,
  }: FinishAttendance.Params): Promise<FinishAttendance.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "put",
      body: {
        IdAtendimento: attendanceId,
        IdPessoaLoja: storeId,
        Transportadora: shipping.company,
        DiasParaEntrega: String(shipping.days),
        IndicaVendaLink: String(!!isSaleLink),
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        const result = httpResponse.body.Result;

        return {
          splitMessage: result.MessageResponse,
          wasSplitted: result.PedidoDividio,
        };
      case HttpStatusCode.notFound:
        throw new Error(httpResponse.body.ErrorMessage);

      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteFinishAttendance {
  export type Model = {
    Result: {
      PedidoDividio: boolean;
      MessageResponse: string;
    };
    ErrorMessage?: string;
  };
}
