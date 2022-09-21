import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { LinkCustomerToAttendance } from "../../../domain/usecases/attendance/link-customer-to-attendance";
import { UpdateAttendanceDeliveryAddress } from "../../../domain/usecases/attendance/update-attendance-delivery-address";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteLinkCustomerToAttendance
  implements LinkCustomerToAttendance
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLinkCustomerToAttendance.Model>
  ) {}

  async execute({
    storeId,
    attendanceId,
    customerId,
  }: LinkCustomerToAttendance.Params): Promise<void> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "put",
      body: {
        IdPessoaLoja: storeId,
        IdAtendimento: attendanceId,
        IdConsumidor: String(customerId),
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

export namespace RemoteLinkCustomerToAttendance {
  export type Model = void;
}
