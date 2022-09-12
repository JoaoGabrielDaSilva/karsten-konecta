import { ProductModel } from "../../models/product";

export interface GetAttendanceList {
  execute(params: GetAttendanceList.Params): Promise<GetAttendanceList.Model>;
}

export namespace GetAttendanceList {
  export type Params = {
    page: number;
    storeId: string;
    cpfCnpj?: string;
    name?: string;
    initialDate?: string;
    endDate?: string;
  };

  export type AttendanceList = {
    name: string;
    cpfCnpj: string;
    createdAt: string;
    totalProductsInCart: number;
    lastAddedProduct: ProductModel;
  };

  export type Model = {
    attendanceList: AttendanceList[];
    totalResults: number;
  };
}
