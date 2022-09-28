import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { LinkResponsibleToAttendance } from "../../../domain/usecases/attendance/link-responsible-to-attendance";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteLinkResponsibleToAttendance
  implements LinkResponsibleToAttendance
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLinkResponsibleToAttendance.Model>
  ) {}

  async execute({
    responsibleName,
    responsibleCpf,
    storeId,
    customerId,
    attendanceId,
    deliveryAddressId,
    pickUpPointId,
  }: LinkResponsibleToAttendance.Params): Promise<LinkResponsibleToAttendance.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "put",
      body: {
        IdPessoaLoja: storeId,
        IdConsumidor: customerId,

        IdAtendimento: attendanceId,
        NomeResponsavelRetirar: responsibleName || undefined,
        CpfResponsavelRetirar: responsibleCpf?.replace(/\D/g, "") || undefined,
        IdEnderecoEntrega: deliveryAddressId,
        IdPontoRetirada: pickUpPointId || null,
      },
    });

    console.log(httpResponse);

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return;
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteLinkResponsibleToAttendance {
  export type Model = void;
}
