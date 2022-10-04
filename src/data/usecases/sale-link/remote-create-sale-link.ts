import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { CreateSaleLink } from "../../../domain/usecases/sale-link/create-sale-link";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteCreateSaleLink implements CreateSaleLink {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteCreateSaleLink.Model>
  ) {}

  async execute({
    storeId,
    orderId,
    saleType,
    totalPrice,
    expirationDate,
    installmentsNumber,
    productList,
  }: CreateSaleLink.Params): Promise<CreateSaleLink.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "post",
      body: {
        idPessoaLoja: storeId,
        idPedido: orderId,
        tipoVenda: saleType,
        valorTotal: totalPrice,
        listProduto: productList.map((item) => ({
          IdProduto: item.id,
          ValorProduto: item.totalPrice,
        })),
        quantidadeParcelas: installmentsNumber,
        dataExpiracao: expirationDate,
      },
    });

    console.log("VL RESPONSE", httpResponse);

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        const result = httpResponse.body?.Result;

        return {
          message: result.ValidationMessage,
        };
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteCreateSaleLink {
  export type Model = {
    Result: {
      ValidationMessage: string;
    };
  };
}
