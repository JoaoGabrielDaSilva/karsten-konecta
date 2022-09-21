import { UnexpectedError } from "../../../domain/errors/unexpected-error";

import { GetCustomerAddressList } from "../../../domain/usecases/customer/get-customer-address-list";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteGetCustomerAddressList implements GetCustomerAddressList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteGetCustomerAddressList.Model>
  ) {}

  async execute({
    id,
  }: GetCustomerAddressList.Params): Promise<GetCustomerAddressList.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
      params: {
        idConsumidorLoja: id,
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        const result = httpResponse.body?.Result;

        return {
          addressList: result.map((item) => ({
            id: String(item.IdConsumidorLojaEndereco),
            name: item.NomeEndereco,
            cep: item.Cep,
            street: item.Logradouro,
            number: item.LogradouroNumero,
            district: item.Bairro,
            complement: item?.LogradouroComplemento,
            city: item.Cidade,
            state: item.Uf,
            reference: item?.Referencia,
            isMain: item.Principal,
          })),
        };
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteGetCustomerAddressList {
  export type Model = {
    Result: {
      Bairro: string;
      Cep: string;
      Cidade: string;
      IdConsumidorLojaEndereco: number;
      Logradouro: string;
      LogradouroComplemento: string;
      LogradouroNumero: string;
      NomeEndereco: string;
      Principal: boolean;
      Referencia: string;
      Uf: string;
    }[];
  };
}
