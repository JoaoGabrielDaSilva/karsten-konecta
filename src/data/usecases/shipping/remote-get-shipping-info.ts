import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { GetShippingInfo } from "../../../domain/usecases/shipping/get-shipping-info";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteGetShippingInfo implements GetShippingInfo {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteGetShippingInfo.Model>
  ) {}

  async get({
    cep,
    brandId,
    totalWeight,
  }: GetShippingInfo.Params): Promise<GetShippingInfo.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
      params: {
        cep,
        idMarca: brandId,
        pesoTotal: totalWeight,
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        const result = httpResponse.body.Result;

        console.log(result);

        const mostCheaperOrFastShipping = result
          .map((option) => ({
            days: Number(option.DiasParaEntrega.split(".")[0]) + 3,
            price:
              option.CustoFreteFixo +
              option.CustoFretePercentualDoPreco +
              option.CustoFretePercentualDoPrecoPeloPeso,
          }))
          .sort((a, b) => {
            return a.price - b.price || a.days - b.days;
          })[0];

        return {
          days: mostCheaperOrFastShipping.days,
        };

      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteGetShippingInfo {
  export type Model = {
    Result: {
      DiasParaEntrega: string;
      CustoFreteFixo: number;
      CustoFretePercentualDoPreco: number;
      CustoFretePercentualDoPrecoPeloPeso: number;
      Transportadora: string;
    }[];
  };
}
