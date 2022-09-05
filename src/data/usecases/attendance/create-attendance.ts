import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { CreateAttendance } from "../../../domain/usecases/attendance/create-attendance";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteCreateAttendance implements CreateAttendance {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async create(data: CreateAttendance.Params): Promise<CreateAttendance.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "post",
      body: data,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      default:
        throw new UnexpectedError();
    }
  }
}
