import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { PersonType } from "../../../domain/models/customer";
import { CreateCustomer } from "../../../domain/usecases/customer/create-customer";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteCreateCustomer implements CreateCustomer {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteCreateCustomer.Model>
  ) {}

  async execute({
    storeId,
    customer,
    type,
  }: CreateCustomer.Params): Promise<CreateCustomer.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "post",
      body: {
        cpf: customer.cpfCnpj,
        email: customer.email,
        nome: customer.name,
        telefone: customer.phone.replace(/\D/g, ""),
        idPessoaLoja: storeId,
        ntEmail: !!customer.optEmail,
        ntSms: !!customer.optSms,
        ntLigacaoTelefonica: !!customer.optPhoneCall,
        ntWhatsapp: !!customer.optWhatsapp,

        ...(type === PersonType.NATURAL
          ? {
              data_nascimento: "birthDate" in customer && customer.birthDate,
              genero: "gender" in customer && customer.gender,
            }
          : {
              nomeFantasia: "fantasyName" in customer && customer.fantasyName,
              inscricaoEstadual:
                "stateRegistration" in customer && customer.stateRegistration,
              nomeResponsavel:
                "responsibleName" in customer && customer.responsibleName,
            }),
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

export namespace RemoteCreateCustomer {
  export type Model = {
    Result: {};
  };
}
