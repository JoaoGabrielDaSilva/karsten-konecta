import { StackScreenProps } from "@react-navigation/stack";
import { RootPrivateStackParamList } from "../../../presentation/routes";
import { Attendance } from "../../../presentation/screens/attendance/attendance";
import { makeRemoteCreateAttendance } from "../../usecases/attendance/remote-create-attendance-factory";
import { makeRemoteDeleteAttendance } from "../../usecases/attendance/remote-delete-attendance-factory";
import { makeRemoteDeleteProduct } from "../../usecases/attendance/remote-delete-product-factory.ts";
import { makeRemoteFinishAttendance } from "../../usecases/attendance/remote-finish-attendance-factory";
import { makeRemoteGetAttendance } from "../../usecases/attendance/remote-get-attendance-factory";
import { makeRemoteLinkCustomerToAttendance } from "../../usecases/attendance/remote-link-customer-to-attendance";
import { makeRemoteLinkResponsibleToAttendance } from "../../usecases/attendance/remote-link-responsible-to-attendance-factory";
import { makeRemoteRetrieveAttendance } from "../../usecases/attendance/remote-retrieve-attendance-factory";
import { makeRemoteUpdatePickupAddress } from "../../usecases/attendance/remote-update-attendance-pickup-address-factory";
import { makeRemoteUpdateProductAmount } from "../../usecases/attendance/remote-update-product-amount-factory";
import { makeRemoteVerifyAttendanceProducts } from "../../usecases/attendance/remote-verify-attendance-products-factory";
import { makeRemoteGetCustomer } from "../../usecases/customer/remote-get-customer-factory";
import { makeRemoteGetShippingInfo } from "../../usecases/shipping/remote-get-shipping-info";

type Props = StackScreenProps<RootPrivateStackParamList, "Attendance">;

export const makeAttendance = (props: Props) => {
  return (
    <Attendance
      getAttendance={makeRemoteGetAttendance()}
      retrieveAttendance={makeRemoteRetrieveAttendance()}
      createAttendance={makeRemoteCreateAttendance()}
      getShippingInfo={makeRemoteGetShippingInfo()}
      getCustomer={makeRemoteGetCustomer()}
      deleteProduct={makeRemoteDeleteProduct()}
      deleteAttendance={makeRemoteDeleteAttendance()}
      updateProductAmount={makeRemoteUpdateProductAmount()}
      updatePickUpAddress={makeRemoteUpdatePickupAddress()}
      verifyAttendanceProducts={makeRemoteVerifyAttendanceProducts()}
      finishAttendance={makeRemoteFinishAttendance()}
      linkResponsibleToAttendance={makeRemoteLinkResponsibleToAttendance()}
      {...props}
    />
  );
};
