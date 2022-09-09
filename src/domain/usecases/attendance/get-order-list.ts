export interface GetOrderList {
  execute(params: GetOrderList.Params): Promise<GetOrderList.Model>;
}

export namespace GetOrderList {
  export type Params = {
    page: number;
    storeId: string;
    code?: string;
    cpfCnpj?: string;
    customerName?: string;
    createDate?: string;
    status?: string;
    modality?: string;
    saleLinkStatus?: string;
  };

  export type OrderListItem = {
    customerName: string;
    orderCode: string;
    createdAt: string;
    attendanceId: string;
    totalProductsIn: string;
    status: string;
    approvedAt: string;
  };

  export type Model = {
    orderList: OrderListItem[];
    totalResults: number;
  };
}
