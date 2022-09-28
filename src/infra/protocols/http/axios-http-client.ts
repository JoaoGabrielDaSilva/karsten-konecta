import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from "../../../data/protocols/http/http-client";

export class AxiosHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;

    try {
      axiosResponse = await axios.request({
        url: data.url,
        data: data.body,
        method: data.method,
        headers: data.headers,
        params: data.params,
      });
    } catch (error) {
      axiosResponse = error.response;
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}

axios.interceptors.request.use((config) => {
  console.log(config.url);
  console.log(config.data);

  return config;
});
