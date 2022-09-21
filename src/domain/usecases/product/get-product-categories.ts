export interface GetProductCategories {
  execute(): Promise<GetProductCategories.Model>;
}

export namespace GetProductCategories {
  export type Model = {
    categories: {
      label: string;
      value: string;
    }[];
  };
}
