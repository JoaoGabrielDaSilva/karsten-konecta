import { faker } from "@faker-js/faker";
import { HttpStatusCode } from "../../../../src/data/protocols/http/http-client";
import { UnexpectedError } from "../../../../src/domain/errors/unexpected-error";

import { HttpClientSpy } from "../../mocks/mock-http";

import { RemoteAuthentication } from "../../../../src/data/usecases/authentication/remote-authentication";
import {
  mockAuthenticationModel,
  mockAuthenticationParams,
  mockRemoteAuthenticationModel,
} from "../../../domain/mocks/mock-authentication";

type SutTypes = {
  sut: RemoteAuthentication;
  httpClientSpy: HttpClientSpy<RemoteAuthentication.Model>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteAuthentication.Model>();
  const sut = new RemoteAuthentication(url, httpClientSpy);

  return {
    sut,
    httpClientSpy,
  };
};

describe("RemoteAuthentication", () => {
  it("should call HttpClient with correct values", async () => {
    const url = faker.internet.url();

    const authenticationParams = mockAuthenticationParams();

    const { sut, httpClientSpy } = makeSut(url);

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteAuthenticationModel(),
    };
    await sut.auth(authenticationParams);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe("post");
    expect(httpClientSpy.body).toBe(authenticationParams);
  });
  it("should throw UnexpectedError if HttpClient returns 422", async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response.statusCode = HttpStatusCode.notFound;

    const promise = sut.auth(mockAuthenticationParams());

    expect(promise).rejects.toThrow(new UnexpectedError());
  });
  it("should return an object of AuthenticationModel if HttpClient returns 200", async () => {
    const { sut, httpClientSpy } = makeSut();

    const userIdMock = faker.random.alphaNumeric(20);

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: {
        Result: {
          IdUser: userIdMock,
        },
      },
    };

    const httpResponse = await sut.auth(mockAuthenticationParams());

    expect(httpResponse).toEqual({
      userId: userIdMock,
    });
  });
});
