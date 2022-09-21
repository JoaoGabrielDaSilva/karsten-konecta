import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { GetStoreAddressList } from "../../../domain/usecases/store/get-store-address-list";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteGetStoreAddressList implements GetStoreAddressList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteGetStoreAddressList.Model>
  ) {}

  async execute(): Promise<GetStoreAddressList.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
    });

    console.log(httpResponse);

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        const result = httpResponse.body.Result;

        console.log(result);

        return {
          addressList: result
            .filter((address) => address.IdPessoa && address.Ativo)
            .map((address) => ({
              id: address.IdPontoRetirada,
              name: address.Nome,
              cep: address.Cep,
              street: address.Logradouro,
              number: address.LogradouroNumero,
              district: address.Bairro,
              city: address.Cidade,
              state: address.Uf,
              instructions: address.InstrucoesRetirada,
            })),
        };
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteGetStoreAddressList {
  export type Model = {
    Result: {
      IdPontoRetirada: string;
      Nome: string;
      Cep: string;
      Logradouro: string;
      LogradouroNumero: string;
      Bairro: string;
      Cidade: string;
      Uf: string;
      InstrucoesRetirada: string;
      IdPessoa: string;
      Ativo: boolean;
    }[];
  };
}
