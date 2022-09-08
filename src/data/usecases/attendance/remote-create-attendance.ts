import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { CreateAttendance } from "../../../domain/usecases/attendance/create-attendance";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteCreateAttendance implements CreateAttendance {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteCreateAttendance.Model>
  ) {}

  async create({
    name,
    cpfCnpj,
    customerId,
    storeId,
  }: CreateAttendance.Params): Promise<CreateAttendance.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "post",
      body: {
        IdConsumidor: customerId || null,
        IdPessoaLoja: storeId,
        NomeAtendimento: name,
        CpfCnpj: cpfCnpj,
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

export namespace RemoteCreateAttendance {
  export type Model = {
    Result: {
      Id: string;
    };
  };
}
