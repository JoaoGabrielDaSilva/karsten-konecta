import { faker } from "@faker-js/faker";
import { HttpStatusCode } from "../../../../src/data/protocols/http/http-client";
import { RemoteDeleteProduct } from "../../../../src/data/usecases/attendance/remote-delete-product";
import { UnexpectedError } from "../../../../src/domain/errors/unexpected-error";

import { HttpClientSpy } from "../../mocks/mock-http";
import { mockAddProductModel } from "../../../domain/mocks/mock-add-product";
import { mockDeleteProductParams } from "../../../domain/mocks/mock-delete-product";

type SutTypes = {
  sut: RemoteDeleteProduct;
  httpClientSpy: HttpClientSpy<RemoteDeleteProduct.Model>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteDeleteProduct.Model>();
  const sut = new RemoteDeleteProduct(url, httpClientSpy);

  return {
    sut,
    httpClientSpy,
  };
};

describe("RemoteDeleteProduct", () => {
  it("should call HttpClient with correct values", async () => {
    const url = faker.internet.url();

    const deleteProductParams = mockDeleteProductParams();

    const { sut, httpClientSpy } = makeSut(url);

    await sut.delete(deleteProductParams);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe("delete");
    expect(httpClientSpy.body).toBe(deleteProductParams);
  });
  it("should throw UnexpectedError if HttpClient returns 422", async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response.statusCode = HttpStatusCode.notFound;

    const promise = sut.delete(mockDeleteProductParams());

    expect(promise).rejects.toThrow(new UnexpectedError());
  });
  it("should return an object of DeleteProductModel if HttpClient returns 200", async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockAddProductModel();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };

    const httpResponse = await sut.delete(mockDeleteProductParams());

    expect(httpResponse).toEqual(httpResult);
  });
});
