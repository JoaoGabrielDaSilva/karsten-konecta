import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { UpdateAttendancePickUpAddress } from "../../../domain/usecases/attendance/update-attendance-pickup-address";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteUpdateAttendancePickUpAddress
  implements UpdateAttendancePickUpAddress
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteUpdateAttendancePickUpAddress.Model>
  ) {}

  async execute({
    storeId,
    addressId,
    attendanceId,
    customerId,
  }: UpdateAttendancePickUpAddress.Params): Promise<UpdateAttendancePickUpAddress.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "put",
      body: {
        IdPessoaLoja: storeId,
        IdAtendimento: attendanceId,
        IdConsumidor: customerId,
        IdPontoRetirada: addressId,
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return;
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteUpdateAttendancePickUpAddress {
  export type Model = void;
}
