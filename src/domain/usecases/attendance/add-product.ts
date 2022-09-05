export interface AddProduct {
  add(params: AddProduct.Params): Promise<AddProduct.Model>;
}

export namespace AddProduct {
  export type Params = {
    storeId: string;
    amount: string;
    productId: string;
    attendanceId: string;
  };

  export type Model = {
    id: string;
    amount: number;
    price: string;
  };
}
