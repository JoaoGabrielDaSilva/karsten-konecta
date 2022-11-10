export interface DuplicateOrder {
  execute(params: DuplicateOrder.Params): Promise<DuplicateOrder.Model>;
}

export namespace DuplicateOrder {
  export type Params = {
    attendanceId: string;
    storeId: string;
  };

  export type Model = {
    id: string;
  };
}
