export interface DeleteAttendance {
  delete(params: DeleteAttendance.Params): Promise<void>;
}

export namespace DeleteAttendance {
  export type Params = {
    id: string;
    storeId: string;
  };
}
