import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { DeleteAttendance } from "../../../domain/usecases/attendance/delete-attendance";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteDeleteAttendance implements DeleteAttendance {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async delete({ id, storeId }: DeleteAttendance.Params): Promise<void> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "delete",
      body: {
        IdAtendimento: id,
        IdPessoaLoja: storeId,
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      default:
        throw new UnexpectedError();
    }
  }
}
