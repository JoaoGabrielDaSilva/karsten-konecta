import axios, { AxiosResponse } from "axios";
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
        method: data.method,
        data: data.body,
        headers: data.headers,
        params: data.params,
      });
    } catch (error) {
      console.log("teste", error.response);

      axiosResponse = error.response;
    }

    console.log("AAAAAAAAAAAAAAAAAA", axiosResponse);

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}

axios.interceptors.request.use((config) => {
  console.log(config);

  return config;
});
