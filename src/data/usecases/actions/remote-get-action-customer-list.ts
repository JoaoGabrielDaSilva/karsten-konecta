import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { GetActionCustomerList } from "../../../domain/usecases/action/get-action-customer-list";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteGetActionCustomerList implements GetActionCustomerList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteGetActionCustomerDetails.Model>
  ) {}

  async execute({
    email,
    name,
    page,
    storeId,
  }: GetActionCustomerList.Params): Promise<GetActionCustomerList.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
      params: {
        nome: name,
        email,
        page,
        idPessoaLoja: storeId,
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        const result = httpResponse.body.Result;
        return {
          customerList: result.ListaClientes?.map((item) => {
            const phone =
              item?.CelularNumero.length > 9
                ? item?.CelularNumero
                : `${item.CelularDdd}${item.CelularNumero}`;

            return {
              name: item.Nome,
              cpfCnpj: item.CpfCnpj,
              birthDate: item.DataNacimentoFormat,
              email: item.Email,
              phone,
              openOrders: item.PedidosAbertos,
            };
          }),
          totalResults: result.TotalRegistros,
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
      ListaClientes: {
        Nome: string;
        CpfCnpj: string;
        DataNacimentoFormat: string;
        Email: string;
        CelularNumero: string;
        CelularDdd: string;
        PedidosAbertos: string;
      }[];
      TotalRegistros: number;
    };
  };
}
