export interface CreateSaleLink {
  execute(params: CreateSaleLink.Params): Promise<CreateSaleLink.Model>;
}

export namespace CreateSaleLink {
  export type Params = {
    storeId: string;
    orderId: string;
    saleType: string;
    totalPrice: string;
    productList: {
      id: string;
      totalPrice: string;
    }[];
    installmentsNumber: string;
    expirationDate: string;
  };

  export type Model = {
    message: string;
  };
}
