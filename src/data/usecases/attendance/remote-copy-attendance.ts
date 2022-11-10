import { string } from "yup";
import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { DuplicateOrder } from "../../../domain/usecases/attendance/duplicate-order";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteDuplicateOrder implements DuplicateOrder {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteDuplicateOrder.Model>
  ) {}

  async execute({
    attendanceId,
    storeId,
  }: DuplicateOrder.Params): Promise<DuplicateOrder.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "post",
      body: {
        IdAtendimento: String(attendanceId),
        IdPessoaLoja: storeId,
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

export namespace RemoteDuplicateOrder {
  export type Model = {
    Result: {
      Id: string;
    };
  };
}
