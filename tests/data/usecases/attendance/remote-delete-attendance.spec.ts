import { faker } from "@faker-js/faker";
import { HttpStatusCode } from "../../../../src/data/protocols/http/http-client";
import { RemoteDeleteAttendance } from "../../../../src/data/usecases/attendance/remote-delete-attendance";
import { UnexpectedError } from "../../../../src/domain/errors/unexpected-error";
import { HttpClientSpy } from "../../mocks/mock-http";
import { mockDeleteAttendanceParams } from "../../../domain/mocks/mock-delete-attendance";

type SutTypes = {
  sut: RemoteDeleteAttendance;
  httpClient: HttpClientSpy;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClient = new HttpClientSpy();
  const sut = new RemoteDeleteAttendance(url, httpClient);

  return {
    sut,
    httpClient,
  };
};

describe("RemoteDeleteAttendance", () => {
  it("should call httpClient with correct values", async () => {
    const url = faker.internet.url();
    const { sut, httpClient } = makeSut(url);

    const deleteAttendanceParams = mockDeleteAttendanceParams();

    await sut.delete(deleteAttendanceParams);

    expect(httpClient.url).toBe(url);
    expect(httpClient.method).toBe("delete");
    expect(httpClient.body).toBe(deleteAttendanceParams);
  });

  it("should throw UnexpectedError if httpClient returns 422", async () => {
    const { sut, httpClient } = makeSut();

    httpClient.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.delete(mockDeleteAttendanceParams());

    expect(promise).rejects.toThrow(new UnexpectedError());
  });
  it("should not throw any errors if httpClient returns 200", async () => {
    const { sut, httpClient } = makeSut();

    httpClient.response = {
      statusCode: HttpStatusCode.ok,
    };
    const promise = sut.delete(mockDeleteAttendanceParams());

    expect(promise).resolves.toBe(undefined);
    expect(promise).resolves.not.toThrow(new UnexpectedError());
  });
});
