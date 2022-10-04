import { faker } from "@faker-js/faker";
import { HttpStatusCode } from "../../../../src/data/protocols/http/http-client";

import { UnexpectedError } from "../../../../src/domain/errors/unexpected-error";
import { HttpClientSpy } from "../../mocks/mock-http";
import {
  mockUpdateProductAmountParams,
  mockRemoteUpdateProductAmountModel,
  mockUpdateProductAmountModel,
} from "../../../domain/mocks/mock-update-product-amount";
import { RemoteUpdateProductAmount } from "../../../../src/data/usecases/attendance/remote-update-product-amount";

type SutTypes = {
  sut: RemoteUpdateProductAmount;
  httpClientSpy: HttpClientSpy<RemoteUpdateProductAmount.Model>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteUpdateProductAmount.Model>();
  const sut = new RemoteUpdateProductAmount(url, httpClientSpy);

  return {
    sut,
    httpClientSpy,
  };
};

describe("RemoteUpdateProductAmount", () => {
  it("should call HttpClient with correct values", async () => {
    const url = faker.internet.url();

    const updateProductAmountParams = mockUpdateProductAmountParams();

    const { sut, httpClientSpy } = makeSut(url);

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteUpdateProductAmountModel(),
    };

    await sut.execute(updateProductAmountParams);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe("put");
    expect(httpClientSpy.body).toEqual({
      IdAtendimentoItem: updateProductAmountParams.id,
      SomarItem: String(updateProductAmountParams.sum),
      IdPessoaLoja: updateProductAmountParams.storeId,
    });
  });
  it("should throw UnexpectedError if HttpClient returns 422", async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };

    const promise = sut.execute(mockUpdateProductAmountParams());

    expect(promise).rejects.toThrow(new UnexpectedError());
  });
  it("should return an object of ChangeProductAmountModel if HttpClient returns 200", async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockUpdateProductAmountModel();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteUpdateProductAmountModel(),
    };

    const httpResponse = await sut.execute(mockUpdateProductAmountParams());

    expect(httpResponse).toEqual(httpResult);
  });
});
