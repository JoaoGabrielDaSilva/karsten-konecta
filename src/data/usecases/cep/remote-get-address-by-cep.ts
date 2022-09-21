import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { GetAddressByCep } from "../../../domain/usecases/cep/get-address-by-cep";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteGetAddressByCep implements GetAddressByCep {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteGetAddressByCep.Model>
  ) {}

  async execute({
    cep,
  }: GetAddressByCep.Params): Promise<GetAddressByCep.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
      params: {
        cep: cep.replace(/\-/g, ""),
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        const result = httpResponse.body.Result;

        return {
          address: {
            street: result?.logradouro,
            cep: result?.cep,
            district: result?.bairro,
            city: result?.cidade,
            state: result?.uf,
          },
        };
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteGetAddressByCep {
  export type Model = {
    Result: {
      bairro?: string;
      cep: string;
      cidade?: string;
      complemento?: string;
      logradouro?: string;
      uf?: string;
    };
  };
}
