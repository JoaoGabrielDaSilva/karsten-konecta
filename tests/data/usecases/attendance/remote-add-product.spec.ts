import { faker } from "@faker-js/faker";
import { HttpStatusCode } from "../../../../src/data/protocols/http/http-client";
import { RemoteAddProduct } from "../../../../src/data/usecases/attendance/remote-add-product";
import { UnexpectedError } from "../../../../src/domain/errors/unexpected-error";

import { HttpClientSpy } from "../../mocks/mock-http";
import {
  mockAddProductModel,
  mockAddProductParams,
} from "../../../domain/mocks/mock-add-product";

type SutTypes = {
  sut: RemoteAddProduct;
  httpClientSpy: HttpClientSpy<RemoteAddProduct.Model>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteAddProduct.Model>();
  const sut = new RemoteAddProduct(url, httpClientSpy);

  return {
    sut,
    httpClientSpy,
  };
};

describe("RemoteAddProduct", () => {
  it("should call HttpClient with correct values", async () => {
    const url = faker.internet.url();

    const addProductParams = mockAddProductParams();

    const { sut, httpClientSpy } = makeSut(url);

    await sut.add(addProductParams);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe("post");
    expect(httpClientSpy.body).toBe(addProductParams);
  });
  it("should throw UnexpectedError if HttpClient returns 422", async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response.statusCode = HttpStatusCode.notFound;

    const promise = sut.add(mockAddProductParams());

    expect(promise).rejects.toThrow(new UnexpectedError());
  });
  it("should return an object of AddProductModel if HttpClient returns 200", async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockAddProductModel();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };

    const httpResponse = await sut.add(mockAddProductParams());

    expect(httpResponse).toEqual(httpResult);
  });
});
