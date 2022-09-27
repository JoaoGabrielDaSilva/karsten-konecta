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
    isDedicated = false,
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

        const formattedOptions = result.map((option) => ({
          company: option.Transportadora,
          days: Number(option.DiasParaEntrega) + 3,
          price:
            option.CustoFreteFixo +
            option.CustoFretePercentualDoPreco +
            option.CustoFretePercentualDoPrecoPeloPeso,
        }));

        const shipping = !isDedicated
          ? formattedOptions.sort((a, b) => {
              return a.price - b.price || a.days - b.days;
            })[0]
          : formattedOptions.find((option) =>
              option.company.includes("Dedicado")
            ) ||
            formattedOptions.sort((a, b) => {
              return a.price - b.price || a.days - b.days;
            })[0];

        return {
          company: shipping.company,
          days: shipping.days,
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
