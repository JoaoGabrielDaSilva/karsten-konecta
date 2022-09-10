import { faker } from "@faker-js/faker";
import { HttpStatusCode } from "../../../../src/data/protocols/http/http-client";
import { UnexpectedError } from "../../../../src/domain/errors/unexpected-error";
import { HttpClientSpy } from "../../mocks/mock-http";
import {
  mockGetAttendanceModel,
  mockGetAttendanceParams,
  mockRemoteGetAttendanceModel,
} from "../../../domain/mocks/mock-get-attendance";
import { RemoteGetOrderList } from "../../../../src/data/usecases/attendance/remote-get-order-list";
import { mockRemoteGetOrderListModel } from "../../mocks/mock-remote-get-order-list";

type SutTypes = {
  sut: RemoteGetOrderList;
  httpClientSpy: HttpClientSpy<RemoteGetOrderList.Model>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteGetOrderList.Model>();
  const sut = new RemoteGetOrderList(url, httpClientSpy);

  return {
    sut,
    httpClientSpy,
  };
};

describe("RemoteGetOrderList", () => {
  it("should call HttpClient with correct URL and Method", async () => {
    const url = faker.internet.url();

    const getAttendanceParams = mockGetAttendanceParams();

    const { sut, httpClientSpy } = makeSut(url);

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteGetOrderListModel(),
    };
    W;

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
  it("should return an object of RemoteGetOrderListModel if HttpClient returns 200", async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockGetAttendanceModel();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: {
        Result: {
          ...mockRemoteGetAttendanceModel().Result,
        },
      },
    };

    const httpResponse = await sut.get(mockGetAttendanceParams());

    expect(httpResponse).toEqual({
      ...httpResult,
      deliveryAddress: null,
    });
  });
});
