export interface UpdateAttendanceDeliveryAddress {
  execute(params: UpdateAttendanceDeliveryAddress.Params): Promise<void>;
}

export namespace UpdateAttendanceDeliveryAddress {
  export type Params = {
    attendanceId: string;
    customerId: string;
    addressId: string;
    storeId: string;
  };

  export type Model = {};
}
