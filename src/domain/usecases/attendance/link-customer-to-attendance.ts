export interface LinkCustomerToAttendance {
  execute(
    params: LinkCustomerToAttendance.Params
  ): Promise<LinkCustomerToAttendance.Model>;
}

export namespace LinkCustomerToAttendance {
  export type Params = {
    storeId: string;
    attendanceId: string;
    customerId: string;
  };

  export type Model = void;
}
