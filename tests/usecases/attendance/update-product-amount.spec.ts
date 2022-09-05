import { faker } from "@faker-js/faker";
import { HttpStatusCode } from "../../../src/data/protocols/http/http-client";
import { RemoteChangeProductAmount } from "../../../src/data/usecases/attendance/change-product-amount";

import { UnexpectedError } from "../../../src/domain/errors/unexpected-error";
import { ChangeProductAmount } from "../../../src/domain/usecases/attendance/change-product-amount";
import { HttpClientSpy } from "../../data/mocks/mock-http";
import {
  mockChangeProductAmountModel,
  mockChangeProductAmountParams,
} from "../../domain/mocks/mock-change-product-amount";

type SutTypes = {
  sut: RemoteChangeProductAmount;
  httpClientSpy: HttpClientSpy;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<ChangeProductAmount.Model>();
  const sut = new RemoteChangeProductAmount(url, httpClientSpy);

  return {
    sut,
    httpClientSpy,
  };
};

describe("ChangeProductAmount", () => {
  it("should call HttpClient with correct values", async () => {
    const url = faker.internet.url();

    const changeProductAmountParams = mockChangeProductAmountParams();

    const { sut, httpClientSpy } = makeSut(url);

    await sut.change(changeProductAmountParams);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe("put");
    expect(httpClientSpy.body).toBe(changeProductAmountParams);
  });
  it("should throw UnexpectedError if HttpClient returns 422", async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response.statusCode = HttpStatusCode.notFound;

    const promise = sut.change(mockChangeProductAmountParams());

    expect(promise).rejects.toThrow(new UnexpectedError());
  });
  it("should return an object of ChangeProductAmountModel if HttpClient returns 200", async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockChangeProductAmountModel();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };

    const httpResponse = await sut.change(mockChangeProductAmountParams());

    expect(httpResponse).toEqual(httpResult);
  });
});
