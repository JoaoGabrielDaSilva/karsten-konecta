export interface RetrieveAttendance {
  retrieve(
    params: RetrieveAttendance.Params
  ): Promise<RetrieveAttendance.Model>;
}

export namespace RetrieveAttendance {
  export type Params = {
    storeId: string;
    cpfCnpj: string;
    customerId: string;
  };

  export type Model = {
    id: string;
  };
}
