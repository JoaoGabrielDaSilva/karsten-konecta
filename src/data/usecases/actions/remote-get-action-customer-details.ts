import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { CustomerAddressModel } from "../../../domain/models/address";
import { GetActionCustomerDetails } from "../../../domain/usecases/action/get-action-customer-details";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteGetActionCustomerDetails
  implements GetActionCustomerDetails
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteGetActionCustomerDetails.Model>
  ) {}

  async execute({
    cpfCnpj,
    storeId,
  }: GetActionCustomerDetails.Params): Promise<GetActionCustomerDetails.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
      params: {
        Cpf: cpfCnpj,
        IdPessoaLoja: storeId,
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        const customerResponse = httpResponse.body.Result.Agenda.Cliente;

        const phoneNumber = customerResponse?.Celular?.split(" ");

        return {
          cpfCnpj: customerResponse?.Cpf,
          name: customerResponse?.Nome,
          birthDate: customerResponse?.DtNascimento,
          age: customerResponse?.Idade,
          email: customerResponse?.Email,
          address: {
            district: customerResponse?.Bairro,
            city: customerResponse?.Cidade,
            state: customerResponse?.Uf,
            cep: customerResponse?.Cep,
          },
          characteristics: customerResponse?.Caracteristica?.Valor,
          phone: phoneNumber[1]?.replace(/\D/g, ""),
          ddd: phoneNumber[0]?.replace(/\D/g, ""),
          callReason: null,
          characteristicUpdate: null,
          favoriteStore: customerResponse?.LojaPrefNome,
          info: httpResponse.body.Result.Agenda?.Dicas,
          whatsapp: customerResponse?.LinkWpp,
        };
      case HttpStatusCode.notFound:
        throw new Error("Nenhum cliente encontrado!");
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteGetActionCustomerDetails {
  export type Model = {
    Result: {
      Agenda: {
        Dicas: string[];
        Cliente: {
          Cpf: string;
          Nome: string;
          DtNascimento: string;
          Idade: string;
          Email: string;
          Bairro: string;
          Cidade: string;
          Uf: string;
          Cep: string;
          Caracteristica: {
            Valor: string;
          };
          Celular: string;

          LojaPrefNome: string;
          LinkWpp: string;
        };
      };
    };
  };
}
