export enum HttpStatusCode {
  ok = 200,
  notFound = 404,
}

export type HttpGetParams = {
  url: string;
  params?: object;
};

export type HttpResponse = {
  statusCode: HttpStatusCode;
  body: any;
};

export interface HttpGetClient {
  get(params: HttpGetParams): Promise<HttpResponse>;
}
