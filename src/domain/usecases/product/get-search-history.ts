export interface GetSearchHistory {
  execute(params: GetSearchHistory.Params): Promise<GetSearchHistory.Model>;
}

export namespace GetSearchHistory {
  export type Params = {
    storeId: string;
    type: "R";
  };

  export type Model = {
    searchHistory: { label: string }[];
  };
}
