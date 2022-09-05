import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { GetAttendance } from "../../../domain/usecases/attendance/get-attendance";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteGetAttendance implements GetAttendance {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async get(params: GetAttendance.Params): Promise<GetAttendance.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
      params: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      default:
        throw new UnexpectedError();
    }
  }
}
