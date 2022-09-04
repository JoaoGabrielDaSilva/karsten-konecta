import { AddressModel } from "../../../domain/models/address";
import { AttendanceModel } from "../../../domain/models/attendance";
import { CustomerModel } from "../../../domain/models/customer";
import { GetAttendance } from "../../../domain/usecases/attendance/get-attendance";
import {
  HttpGetClient,
  HttpResponse,
  HttpStatusCode,
} from "../../protocols/http/http-get-client";

const mockAddress = (): AddressModel => ({
  street: "José Linck",
  number: "112",
  cep: "93054190",
  city: "São Leopoldo",
  district: "Feitoria",
  name: "Casa",
  state: "RS",
  isMain: true,
});

const mockCustomer = (): CustomerModel => ({
  name: "João Gabriel",
  cpf: "02526108063",
  address: mockAddress(),
});

const mockAttendance = (): AttendanceModel => ({
  id: "1",
  customer: mockCustomer(),
  productList: [],
  get name() {
    return this.customer.name;
  },
});

export class RemoteGetAttendance implements GetAttendance {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async get(): Promise<AttendanceModel> {
    // const httpResponse = await this.httpGetClient.get({
    //   url: this.url,
    // });

    const httpResponse = await new Promise<HttpResponse>((resolve) => {
      setTimeout(() => {
        resolve({
          statusCode: HttpStatusCode.ok,
          body: mockAttendance(),
        });
      }, 1500);
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.notFound:
        throw new Error("Atendimento não encontrado!");
    }
  }
}
