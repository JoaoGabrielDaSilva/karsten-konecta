export interface GetProductGrid {
  get(params: GetProductGrid.Params): Promise<GetProductGrid.Model>;
}

export namespace GetProductGrid {
  export type Params = {
    code: string;
    color: string;
  };

  export type Model = {
    colorList: {
      code: string;
      color: string;
      uri: string;
      sizeList: { code: string; size: string }[];
    }[];
  };
}
