import { faker } from "@faker-js/faker";
import { HttpStatusCode } from "../../../../src/data/protocols/http/http-client";
import { RemoteCopyAttendance } from "../../../../src/data/usecases/attendance/remote-copy-attendance";
import { UnexpectedError } from "../../../../src/domain/errors/unexpected-error";
import { HttpClientSpy } from "../../mocks/mock-http";
import {
  mockCopyAttendanceModel,
  mockCopyAttendanceParams,
} from "../../../domain/mocks/mock-copy-attendance";

type SutTypes = {
  sut: RemoteCopyAttendance;
  httpClient: HttpClientSpy<RemoteCopyAttendance.Model>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClient = new HttpClientSpy<RemoteCopyAttendance.Model>();
  const sut = new RemoteCopyAttendance(url, httpClient);

  return {
    sut,
    httpClient,
  };
};

describe("RemoteCopyAttendance", () => {
  it("should call httpClient with correct values", async () => {
    const url = faker.internet.url();
    const { sut, httpClient } = makeSut(url);

    const deleteAttendanceParams = mockCopyAttendanceParams();

    await sut.copy(deleteAttendanceParams);

    expect(httpClient.url).toBe(url);
    expect(httpClient.method).toBe("post");
    expect(httpClient.body).toBe(deleteAttendanceParams);
  });

  it("should throw UnexpectedError if httpClient returns 422", async () => {
    const { sut, httpClient } = makeSut();

    httpClient.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.copy(mockCopyAttendanceParams());

    expect(promise).rejects.toThrow(new UnexpectedError());
  });
  it("should return CopyAttendanceModel if httpClient returns 200", async () => {
    const { sut, httpClient } = makeSut();

    const httpResult = mockCopyAttendanceModel();

    httpClient.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const httpResponse = await sut.copy(mockCopyAttendanceParams());

    expect(httpResponse).toEqual(httpResult);
  });
});
