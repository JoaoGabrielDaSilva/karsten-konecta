import { faker } from "@faker-js/faker";
import { HttpStatusCode } from "../../../../src/data/protocols/http/http-client";
import { RemoteGetAttendance } from "../../../../src/data/usecases/attendance/remote-get-attendance";
import { UnexpectedError } from "../../../../src/domain/errors/unexpected-error";
import { HttpClientSpy } from "../../mocks/mock-http";
import {
  mockGetAttendanceModel,
  mockGetAttendanceParams,
  mockRemoteGetAttendanceModel,
} from "../../../domain/mocks/mock-get-attendance";

type SutTypes = {
  sut: RemoteGetAttendance;
  httpClientSpy: HttpClientSpy<RemoteGetAttendance.Model>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteGetAttendance.Model>();
  const sut = new RemoteGetAttendance(url, httpClientSpy);

  return {
    sut,
    httpClientSpy,
  };
};

describe("RemoteGetAttendance", () => {
  it("should call HttpClient with correct URL and Method", async () => {
    const url = faker.internet.url();

    const getAttendanceParams = mockGetAttendanceParams();

    const { sut, httpClientSpy } = makeSut(url);

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteGetAttendanceModel(),
    };

    await sut.get(getAttendanceParams);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe("get");
    expect(httpClientSpy.params).toEqual({
      IdAtendimento: getAttendanceParams.id,
      IdPessoaLoja: getAttendanceParams.storeId,
    });
  });
  it("should throw UnexpectedError if HttpClient returns 422", async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.get(mockGetAttendanceParams());

    expect(promise).rejects.toThrow(new UnexpectedError());
  });
  it("should return an object of GetAttendanceModel if HttpClient returns 200", async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockGetAttendanceModel();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteGetAttendanceModel(),
    };

    const httpResponse = await sut.get(mockGetAttendanceParams());

    expect(httpResponse).toEqual(httpResult);
  });
});
