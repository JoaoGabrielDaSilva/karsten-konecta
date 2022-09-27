import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import {
  CustomerModel,
  Gender,
  PersonType,
} from "../../../domain/models/customer";
import { GetCustomer } from "../../../domain/usecases/customer/get-customer";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteGetCustomer implements GetCustomer {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteGetCustomer.Model>
  ) {}

  async get(params: GetCustomer.Params): Promise<CustomerModel> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
      params: {
        cpf: params.cpfCnpj,
        idPessoaLoja: params.storeId,
      },
    });

    const result = httpResponse.body?.Result;

    const personType = result?.PessoaJuridica
      ? PersonType.LEGAL
      : PersonType.NATURAL;

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return {
          id: result.Id,
          name: result.Nome,
          cpfCnpj: result.Cpf,
          email: result.Email,
          phone: result.CelularNumero,
          personType,
          ...(personType === PersonType.NATURAL
            ? {
                birthDate: result?.DataNacimentoFormat,
                gender: result.Genero,
              }
            : {
                fantasyName: result.NomeFantasia,
                responsibleName: result.NomeResponsavel,
                stateRegistration: result.InscricaoEstadual,
              }),
          optEmail: !!result.NtEmail,
          optSms: !!result.NtSms,
          optPhoneCall: !!result.NtLigacaoTelefonica,
          optWhatsapp: !!result.NtWhatsapp,
          addressList: result?.Enderecos
            ? result.Enderecos.map((item) => ({
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
              }))
            : [],
        };
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteGetCustomer {
  export type Model = {
    Result: {
      Id: string;
      Nome: string;
      Cpf: string;
      Email: string;
      CelularNumero: string;
      NtEmail: string;
      NtSms: string;
      NtLigacaoTelefonica: string;
      NtWhatsapp: string;
      PessoaJuridica: boolean;
      Genero?: Gender;
      DataNacimentoFormat?: string;
      NomeFantasia?: string;
      InscricaoEstadual?: string;
      NomeResponsavel?: string;
      Enderecos: {
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
  };
}
