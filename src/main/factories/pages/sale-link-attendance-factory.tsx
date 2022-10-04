import { StackScreenProps } from "@react-navigation/stack";

import { RootPrivateStackParamList } from "../../../presentation/routes";
import { SaleLinkAttendance } from "../../../presentation/screens/sale-link-attendance/sale-link-attendance";
import { makeRemoteFinishAttendance } from "../../usecases/attendance/remote-finish-attendance-factory";
import { makeRemoteGetOrderDetails } from "../../usecases/order/remote-get-order-details-factory";
import { makeRemoteCreateSaleLink } from "../../usecases/sale-link/remote-create-sale-link-factory";
import { makeRemoteGetSaleLinkConfiguration } from "../../usecases/sale-link/remote-get-sale-link-configuration-factory";

type Props = StackScreenProps<RootPrivateStackParamList, "SaleLinkAttendance">;

export const makeSaleLinkAttendance = (props: Props) => {
  return (
    <SaleLinkAttendance
      getSaleLinkConfiguration={makeRemoteGetSaleLinkConfiguration()}
      createSaleLink={makeRemoteCreateSaleLink()}
      getOrderDetails={makeRemoteGetOrderDetails()}
      finishAttendance={makeRemoteFinishAttendance()}
      {...props}
    />
  );
};
