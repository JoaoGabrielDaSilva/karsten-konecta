import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { CreateCustomerAddress } from "../../../domain/usecases/customer/create-customer-address";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteCreateCustomerAddress implements CreateCustomerAddress {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteCreateCustomerAddress.Model>
  ) {}

  async execute({
    customerId,
    address,
  }: CreateCustomerAddress.Params): Promise<CreateCustomerAddress.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "post",
      body: {
        principal: !!address.isMain,
        nomeEndereco: address.name,
        logradouro: address.street,
        logradouroNumero: address.number,
        logradouroComplemento: address?.complement,
        bairro: address.district,
        cidade: address.city,
        uf: address.state,
        cep: address.cep.replace(/\-/g, ""),
        referencia: address?.reference,
        idConsumidorLoja: customerId,
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return;
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteCreateCustomerAddress {
  export type Model = {
    Result: {};
  };
}
