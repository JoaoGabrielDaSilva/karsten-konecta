import axios from "axios";
import {
  HttpGetClient,
  HttpGetParams,
  HttpResponse,
} from "../../../data/protocols/http/http-get-client";

export class AxiosHttpClient implements HttpGetClient {
  async get(data: HttpGetParams): Promise<HttpResponse> {
    const httpResponse = await axios.get(data.url, data.params);

    return {
      body: httpResponse.data,
      statusCode: httpResponse.status,
    };
  }
}
