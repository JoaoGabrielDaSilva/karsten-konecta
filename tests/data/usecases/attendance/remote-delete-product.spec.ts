import { faker } from "@faker-js/faker";
import { HttpStatusCode } from "../../../../src/data/protocols/http/http-client";
import { RemoteDeleteProduct } from "../../../../src/data/usecases/attendance/remote-delete-product";
import { UnexpectedError } from "../../../../src/domain/errors/unexpected-error";

import { HttpClientSpy } from "../../mocks/mock-http";
import { mockAddProductModel } from "../../../domain/mocks/mock-add-product";
import {
  mockDeleteProductModel,
  mockDeleteProductParams,
} from "../../../domain/mocks/mock-delete-product";

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

    await sut.execute(deleteProductParams);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe("delete");
    expect(httpClientSpy.body).toEqual({
      IdAtendimentoItem: deleteProductParams.id,
      IdPessoaLoja: deleteProductParams.storeId,
    });
  });
  it("should throw UnexpectedError if HttpClient returns 422", async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.execute(mockDeleteProductParams());

    expect(promise).rejects.toThrow(new UnexpectedError());
  });
  it("should return an object of DeleteProductModel if HttpClient returns 200", async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockDeleteProductModel();

    const deleteProductParams = mockDeleteProductParams();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
    };

    const httpResponse = await sut.execute(deleteProductParams);

    expect(httpResponse).toEqual({
      deletedProductId: deleteProductParams.id,
    });
  });
});
