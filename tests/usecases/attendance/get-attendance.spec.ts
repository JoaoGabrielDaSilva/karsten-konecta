import { faker } from "@faker-js/faker";
import { HttpStatusCode } from "../../../src/data/protocols/http/http-client";
import { RemoteGetAttendance } from "../../../src/data/usecases/attendance/get-attendance";
import { UnexpectedError } from "../../../src/domain/errors/unexpected-error";
import { GetAttendance } from "../../../src/domain/usecases/attendance/get-attendance";
import { HttpClientSpy } from "../../data/mocks/mock-http";
import {
  mockGetAttendanceModel,
  mockGetAttendanceParams,
} from "../../domain/mocks/mock-get-attendance";

type SutTypes = {
  sut: RemoteGetAttendance;
  httpClientSpy: HttpClientSpy;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<GetAttendance.Model>();
  const sut = new RemoteGetAttendance(url, httpClientSpy);

  return {
    sut,
    httpClientSpy,
  };
};

describe("GetAttendance", () => {
  it("should call HttpClient with correct URL and Method", async () => {
    const url = faker.internet.url();

    const getAttendanceParams = mockGetAttendanceParams();

    const { sut, httpClientSpy } = makeSut(url);

    await sut.get(getAttendanceParams);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe("get");
    expect(httpClientSpy.params).toBe(getAttendanceParams);
  });
  it("should throw UnexpectedError if HttpClient returns 422", async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response.statusCode = HttpStatusCode.notFound;

    const promise = sut.get(mockGetAttendanceParams());

    expect(promise).rejects.toThrow(new UnexpectedError());
  });
  it("should return an object of GetAttendanceModel if HttpClient returns 200", async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockGetAttendanceModel();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };

    const httpResponse = await sut.get(mockGetAttendanceParams());

    expect(httpResponse).toEqual(httpResult);
  });
});
