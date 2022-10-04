import { faker } from "@faker-js/faker";
import { HttpStatusCode } from "../../../../src/data/protocols/http/http-client";
import { UnexpectedError } from "../../../../src/domain/errors/unexpected-error";
import { HttpClientSpy } from "../../mocks/mock-http";

import { RemoteGetOrderList } from "../../../../src/data/usecases/attendance/remote-get-order-list";
import {
  mockGetOrderListModel,
  mockRemoteGetOrderListModel,
} from "../../mocks/mock-remote-get-order-list";
import { mockGetOrderListParams } from "../../../domain/mocks/mock-get-order-list";

type SutTypes = {
  sut: RemoteGetOrderList;
  httpClientSpy: HttpClientSpy<RemoteGetOrderList.Model>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteGetOrderList.Model>();
  const sut = new RemoteGetOrderList(url, httpClientSpy);

  return {
    sut,
    httpClientSpy,
  };
};

describe("RemoteGetOrderList", () => {
  it("should call HttpClient with correct URL and Method", async () => {
    const url = faker.internet.url();

    const getOrderListParams = mockGetOrderListParams();

    const { sut, httpClientSpy } = makeSut(url);

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteGetOrderListModel(),
    };

    await sut.execute(getOrderListParams);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe("get");
    expect(httpClientSpy.params).toEqual({
      IdPessoaLoja: getOrderListParams.storeId,
      Page: getOrderListParams.page,
      CodigoPedido: getOrderListParams?.code,
      Cpf: getOrderListParams?.cpfCnpj,
      NomeCliente: getOrderListParams?.customerName,
      DataCriacao: getOrderListParams?.createDate,
      Modalidade: getOrderListParams?.modality,
      ...(getOrderListParams?.saleLinkStatus
        ? { CodigoStatusVendaLink: getOrderListParams?.saleLinkStatus }
        : { Status: getOrderListParams?.status }),
      Status: getOrderListParams?.status,
    });
  });
  it("should throw UnexpectedError if HttpClient returns 422", async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.execute(mockGetOrderListParams());

    expect(promise).rejects.toThrow(new UnexpectedError());
  });
  it("should return an object of RemoteGetOrderListModel if HttpClient returns 200", async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockGetOrderListModel();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: {
        ...mockRemoteGetOrderListModel(),
      },
    };

    const httpResponse = await sut.execute(mockGetOrderListParams());

    expect(httpResponse).toEqual(httpResult);
  });
});
