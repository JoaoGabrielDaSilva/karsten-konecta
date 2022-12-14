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
  console.log("API", {
    url: config.url,
    params: config.params,
    data: config.data,
    headers: config.headers,
  });

  return config;
});
axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    let customError = { ...error };

    if (customError?.response?.data?.ErrorMessage) {
      customError.response.data.ErrorMessage =
        error.response.data.ErrorMessage.replace(/HTTPERRO 422 /g, "");
    }

    return Promise.reject(customError);
  }
);
