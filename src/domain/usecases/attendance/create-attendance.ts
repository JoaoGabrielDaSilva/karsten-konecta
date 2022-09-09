export interface CreateAttendance {
  create(params: CreateAttendance.Params): Promise<CreateAttendance.Model>;
}

export namespace CreateAttendance {
  export type Params = {
    name: string;
    cpfCnpj?: string;
    customerId?: string;
    storeId: string;
  };

  export type Model = {
    id: string;
  };
}
