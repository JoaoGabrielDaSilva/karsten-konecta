export interface UpdateAttendancePickUpAddress {
  execute(params: UpdateAttendancePickUpAddress.Params): Promise<void>;
}

export namespace UpdateAttendancePickUpAddress {
  export type Params = {
    attendanceId: string;
    customerId: string;
    addressId: string;
    storeId: string;
  };

  export type Model = void;
}
