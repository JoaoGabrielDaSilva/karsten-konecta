export interface DeleteProduct {
  delete(params: DeleteProduct.Params): Promise<DeleteProduct.Model>;
}

export namespace DeleteProduct {
  export type Params = {
    id: string;
    storeId: string;
  };

  export type Model = {
    id: string;
  };
}
