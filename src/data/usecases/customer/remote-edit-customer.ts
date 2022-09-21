import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { PersonType } from "../../../domain/models/customer";
import { EditCustomer } from "../../../domain/usecases/customer/edit-customer";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteEditCustomer implements EditCustomer {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteEditCustomer.Model>
  ) {}

  async execute({
    storeId,
    customer,
    type,
  }: EditCustomer.Params): Promise<EditCustomer.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "put",
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

export namespace RemoteEditCustomer {
  export type Model = {
    Result: {};
  };
}
