import axios from "axios";
import { AxiosHttpClient } from "../../../src/infra/protocols/http/axios-http-client";
import { mockHttpRequest } from "../../data/mocks/mock-http";
import { mockAxios, mockHttpResponse } from "../mocks/mock-axios";

jest.mock("axios");

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
  const mockedAxios = mockAxios();
  const sut = new AxiosHttpClient();

  return {
    sut,
    mockedAxios,
  };
};

describe("AxiosHttpClient", () => {
  it("should call axios with correct values", async () => {
    const request = mockHttpRequest();

    const { sut, mockedAxios } = makeSut();

    await sut.request(request);

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      method: request.method,
      headers: request.headers,
      data: request.body,
    });
  });

  it("should return correct response", async () => {
    const { sut, mockedAxios } = makeSut();

    const httpResponse = await sut.request(mockHttpRequest());
    const axiosResponse = await mockedAxios.request.mock.results[0].value;

    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    });
  });

  it("it should return correct error", async () => {
    const { sut, mockedAxios } = makeSut();

    mockedAxios.request.mockRejectedValueOnce({
      response: mockHttpResponse(),
    });

    const promise = sut.request(mockHttpRequest());

    expect(promise).rejects.toEqual(mockedAxios.request.mock.results[0].value);
  });
});
