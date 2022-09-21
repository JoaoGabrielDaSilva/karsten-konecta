import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { UpdateAttendanceDeliveryAddress } from "../../../domain/usecases/attendance/update-attendance-delivery-address";
import { UpdateProductAmount } from "../../../domain/usecases/attendance/update-product-amount";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteUpdateAttendanceDeliveryAddress
  implements UpdateAttendanceDeliveryAddress
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteUpdateAttendanceDeliveryAddress.Model>
  ) {}

  async execute({
    storeId,
    addressId,
    attendanceId,
    customerId,
  }: UpdateAttendanceDeliveryAddress.Params): Promise<void> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "put",
      body: {
        IdPessoaLoja: storeId,
        IdAtendimento: attendanceId,
        IdConsumidor: customerId,
        IdEnderecoEntrega: addressId,
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

export namespace RemoteUpdateAttendanceDeliveryAddress {
  export type Model = {};
}
