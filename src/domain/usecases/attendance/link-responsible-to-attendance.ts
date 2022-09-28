export interface LinkResponsibleToAttendance {
  execute(
    params: LinkResponsibleToAttendance.Params
  ): Promise<LinkResponsibleToAttendance.Model>;
}

export namespace LinkResponsibleToAttendance {
  export type Params = {
    attendanceId: string;
    storeId: string;
    responsibleName: string;
    responsibleCpf: string;
    deliveryAddressId: string;
    customerId: string;
    pickUpPointId: string;
  };

  export type Model = void;
}
