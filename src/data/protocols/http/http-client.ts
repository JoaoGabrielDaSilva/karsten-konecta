export enum HttpStatusCode {
  ok = 200,
  notFound = 422,
}

export type HttpMethod = "post" | "get" | "put" | "delete";

export type HttpRequest = {
  url: string;
  method: HttpMethod;
  body?: any;
  headers?: any;
  params?: any;
};

export interface HttpClient<R = any> {
  request(data: HttpRequest): Promise<HttpResponse<R>>;
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body?: T;
};
