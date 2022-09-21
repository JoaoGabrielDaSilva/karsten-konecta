import { StockModel } from "../../models/stock-model";

export interface GetProductStock {
  execute(params: GetProductStock.Params): Promise<GetProductStock.Model>;
}

export namespace GetProductStock {
  export type Params = {
    ean: string;
  };

  export type Model = {
    stockList: StockModel[];
  };
}
