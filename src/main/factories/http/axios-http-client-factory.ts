import { AxiosHttpClient } from "../../../infra/protocols/http/axios-http-client";

export const makeAxiosHttpClient = (): AxiosHttpClient => new AxiosHttpClient();
