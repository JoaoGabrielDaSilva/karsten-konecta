import { faker } from "@faker-js/faker";
import { HttpStatusCode } from "../../../../src/data/protocols/http/http-client";
import { RemoteCreateAttendance } from "../../../../src/data/usecases/attendance/remote-create-attendance";
import { UnexpectedError } from "../../../../src/domain/errors/unexpected-error";
import { HttpClientSpy } from "../../mocks/mock-http";
import {
  mockCreateAttendanceParams,
  mockCreateAttendanceModel,
} from "../../../domain/mocks/mock-create-attendance";

type SutTypes = {
  sut: RemoteCreateAttendance;
  httpClientSpy: HttpClientSpy<RemoteCreateAttendance.Model>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteCreateAttendance.Model>();
  const sut = new RemoteCreateAttendance(url, httpClientSpy);

  return {
    sut,
    httpClientSpy,
  };
};

describe("CreateAttendance", () => {
  it("should call HttpClient with correct values", async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    const createAttendanceParams = mockCreateAttendanceParams();

    await sut.create(createAttendanceParams);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe("post");
  });
  it("should throw UnexpectedError if HttpClient returns 422", async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response.statusCode = HttpStatusCode.notFound;

    const createAttendanceParams = mockCreateAttendanceParams();

    const promise = sut.create(createAttendanceParams);

    expect(promise).rejects.toThrow(new UnexpectedError());
  });
  it("should return an object of CreateAttendanceModel if HttpClient returns 200", async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockCreateAttendanceModel();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };

    const httpResponse = await sut.create(mockCreateAttendanceParams());

    expect(httpResponse).toEqual(httpResult);
  });
});
