import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { EditCustomerAddress } from "../../../domain/usecases/customer/edit-customer-address";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteEditCustomerAddress implements EditCustomerAddress {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteEditCustomerAddress.Model>
  ) {}

  async execute({
    customerId,
    address,
  }: EditCustomerAddress.Params): Promise<EditCustomerAddress.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "put",
      body: {
        principal: String(!!address.isMain),
        nomeEndereco: address.name,
        logradouro: address.street,
        logradouroNumero: address.number,
        logradouroComplemento: address?.complement,
        bairro: address.district,
        cidade: address.city,
        uf: address.state,
        cep: address.cep.replace(/\-/g, ""),
        referencia: address?.reference,
        idConsumidorLoja: String(customerId),
        idConsumidorLojaEndereco: address.id,
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

export namespace RemoteEditCustomerAddress {
  export type Model = {
    Result: {};
  };
}
