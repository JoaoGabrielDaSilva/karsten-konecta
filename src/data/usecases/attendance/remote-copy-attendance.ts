import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { CopyAttendance } from "../../../domain/usecases/attendance/copy-attendance";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteCopyAttendance implements CopyAttendance {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<CopyAttendance.Model>
  ) {}

  async copy(params: CopyAttendance.Params): Promise<CopyAttendance.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "post",
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteCopyAttendance {
  export type Model = CopyAttendance.Model;
}
