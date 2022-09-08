export interface CopyAttendance {
  copy(params: CopyAttendance.Params): Promise<CopyAttendance.Model>;
}

export namespace CopyAttendance {
  export type Params = {
    id: string;
    storeId: string;
  };

  export type Model = {
    id: string;
  };
}
