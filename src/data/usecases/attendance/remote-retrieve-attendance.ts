import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { RetrieveAttendance } from "../../../domain/usecases/attendance/retrieve-attendance";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteRetrieveAttendance implements RetrieveAttendance {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteRetrieveAttendance.Model>
  ) {}

  async retrieve({
    cpfCnpj,
    customerId,
    storeId,
  }: RetrieveAttendance.Params): Promise<RetrieveAttendance.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
      params: {
        IdPessoaLoja: storeId,
        CpfCnpj: cpfCnpj,
        IdConsumidor: customerId,
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return {
          id: httpResponse.body.Result.Id,
        };
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteRetrieveAttendance {
  export type Model = {
    Result: {
      Id: string;
    };
  };
}
