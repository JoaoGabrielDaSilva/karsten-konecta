import { faker } from "@faker-js/faker";
import { HttpStatusCode } from "../../../../src/data/protocols/http/http-client";
import { RemoteDeleteAttendance } from "../../../../src/data/usecases/attendance/remote-delete-attendance";
import { UnexpectedError } from "../../../../src/domain/errors/unexpected-error";
import { HttpClientSpy } from "../../mocks/mock-http";
import { mockDeleteAttendanceParams } from "../../../domain/mocks/mock-delete-attendance";

type SutTypes = {
  sut: RemoteDeleteAttendance;
  httpClientSpy: HttpClientSpy;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteDeleteAttendance(url, httpClientSpy);

  return {
    sut,
    httpClientSpy,
  };
};

describe("RemoteDeleteAttendance", () => {
  it("should call httpClient with correct values", async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);

    const deleteAttendanceParams = mockDeleteAttendanceParams();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
    };

    await sut.delete(deleteAttendanceParams);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe("delete");
    expect(httpClientSpy.body).toBe(deleteAttendanceParams);
  });

  it("should throw UnexpectedError if httpClient returns 422", async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.delete(mockDeleteAttendanceParams());

    expect(promise).rejects.toThrow(new UnexpectedError());
  });
  it("should not throw any errors if httpClient returns 200", async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
    };
    const promise = sut.delete(mockDeleteAttendanceParams());

    expect(promise).resolves.toBe(undefined);
    expect(promise).resolves.not.toThrow(new UnexpectedError());
  });
});
