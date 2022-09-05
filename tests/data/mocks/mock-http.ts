import { faker } from "@faker-js/faker";
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from "../../../src/data/protocols/http/http-client";

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.helpers.arrayElement(["get", "post", "put", "delete"]),
  body: {
    any: faker.random.word(),
  },
  headers: {
    any: faker.random.word(),
  },
  params: {
    any: faker.random.word(),
  },
});

export class HttpClientSpy<R = any> implements HttpClient<R> {
  url?: string;
  method?: string;
  body?: any;
  headers?: any;
  params?: any;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async request(data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url;
    this.method = data.method;
    this.body = data.body;
    this.headers = data.headers;
    this.params = data.params;

    return this.response;
  }
}
