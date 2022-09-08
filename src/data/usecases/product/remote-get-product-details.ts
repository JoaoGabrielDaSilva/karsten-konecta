import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { ProductModel } from "../../../domain/models/product";
import { GetProductDetails } from "../../../domain/usecases/product/get-product-details";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteGetProductDetails implements GetProductDetails {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteGetProductDetails.Model>
  ) {}

  async get({
    code,
    storeId,
  }: GetProductDetails.Params): Promise<GetProductDetails.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
      params: {
        idProduto: code,
        idPessoaLoja: storeId,
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        const result = httpResponse.body.Result;

        return {
          carouselImages: result.Midias.map((item) => item.Url),
          ean: result.EANs[0].EanProduto,
          suggestions: result.Sugestoes.map((product) => ({
            name: product.NomeComercial,
            code: product.IdProduto,
            ean: product.Ean,
            uri: product.Url,
          })),
          price: result.Preco,
          weight: result.PesoProduto,
          productInfoHtml: result?.InformacoesProdutoHtml,
          videoUri: result?.InformacoesProdutoVideo,
          specifications: [
            ...result.Especificacoes.map((item) => ({
              label: item.Descricao,
              value: item.Valor,
            })),
            ...[
              {
                label: "CEST",
                value: result?.Cest,
              },
              {
                label: "CST Cofins",
                value: result?.CstCofins,
              },
              {
                label: "Alíquota Cofins",
                value: result?.AliquotaCofins?.toString()?.replace(/\./, ","),
              },
              {
                label: "Cst Pis",
                value: result?.CstPis,
              },
              {
                label: "Alíquota Pis",
                value: result?.AliquotaPis?.toString()?.replace(/\./, ","),
              },
              {
                label: "Código de Barras",
                value: result?.EANs[0].EanProduto,
              },
              {
                label: "Origem",
                value: result.OrigemMercado,
              },
              {
                label: "Classificação Fiscal - NCM",
                value: result.Ncm,
              },
            ],
          ],
          color: result.Especificacoes.find(
            (item) => item.Descricao === "COR"
          ).Valor.trim(),
          name: result.DescricaoProdutoApp,
          code: result.IdProduto,
          costPrice: result.PrecoCusto,
        };

      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteGetProductDetails {
  export type Model = {
    Result: {
      Midias: {
        Url: string;
      }[];
      EANs: { EanProduto: string }[];
      Sugestoes: {
        NomeComercial: string;
        IdProduto: string;
        Ean: string;
        Url: string;
      }[];
      Preco: number;
      PesoProduto: number;
      InformacoesProdutoHtml: string;
      InformacoesProdutoVideo: string;
      Especificacoes: {
        Descricao: string;
        Valor: string;
      }[];
      DescricaoProdutoApp: string;
      IdProduto: string;
      PrecoCusto: number;
      Cest: string;
      CstCofins: string;
      AliquotaCofins: string;
      CstPis: string;
      AliquotaPis: string;
      OrigemMercado: string;
      Ncm: string;
    };
  };
}
