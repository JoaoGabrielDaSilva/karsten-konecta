import { faker } from "@faker-js/faker";
import { HttpStatusCode } from "../../../../src/data/protocols/http/http-client";
import { UnexpectedError } from "../../../../src/domain/errors/unexpected-error";
import { HttpClientSpy } from "../../mocks/mock-http";

import { RemoteGetAttendanceList } from "../../../../src/data/usecases/attendance/remote-get-attendance-list";
import {
  mockGetAttendanceListModel,
  mockGetAttendanceListParams,
  mockRemoteGetAttendanceListModel,
} from "../../../domain/mocks/mock-remote-get-attendance-list";

type SutTypes = {
  sut: RemoteGetAttendanceList;
  httpClientSpy: HttpClientSpy<RemoteGetAttendanceList.Model>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteGetAttendanceList.Model>();
  const sut = new RemoteGetAttendanceList(url, httpClientSpy);

  return {
    sut,
    httpClientSpy,
  };
};

describe("RemoteGetAttendanceListModel", () => {
  it("should call HttpClient with correct URL and Method", async () => {
    const url = faker.internet.url();

    const getAttendanceParams = mockGetAttendanceListParams();

    const { sut, httpClientSpy } = makeSut(url);

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteGetAttendanceListModel(),
    };

    await sut.execute(getAttendanceParams);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe("get");
    expect(httpClientSpy.params).toEqual({
      CPF: getAttendanceParams.cpfCnpj,
      DataCriacaoFinal: getAttendanceParams.initialDate,
      DataCriacaoInicial: getAttendanceParams.endDate,
      IdPessoaLoja: getAttendanceParams.storeId,
      Nome: getAttendanceParams.name,
      Page: getAttendanceParams.page,
    });
  });
  it("should throw UnexpectedError if HttpClient returns 422", async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.execute(mockGetAttendanceListParams());

    expect(promise).rejects.toThrow(new UnexpectedError());
  });
  it("should return an object of GetAttendanceListModel if HttpClient returns 200", async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockGetAttendanceListModel();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteGetAttendanceListModel(),
    };

    const httpResponse = await sut.execute(mockGetAttendanceListParams());

    expect(httpResponse).toEqual(httpResult);
  });
});
