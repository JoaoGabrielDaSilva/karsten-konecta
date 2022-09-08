import { StackScreenProps } from "@react-navigation/stack";
import { RootPrivateStackParamList } from "../../../presentation/routes";
import { Attendance } from "../../../presentation/screens/attendance/attendance";
import { makeRemoteCreateAttendance } from "../../usecases/attendance/remote-create-attendance-factory";
import { makeRemoteGetAttendance } from "../../usecases/attendance/remote-get-attendance-factory";
import { makeRemoteRetrieveAttendance } from "../../usecases/attendance/remote-retrieve-attendance-factory";
import { makeRemoteGetShippingInfo } from "../../usecases/shipping/remote-get-shipping-info";

type Props = StackScreenProps<RootPrivateStackParamList, "Attendance">;

export const makeAttendance = (props: Props) => {
  return (
    <Attendance
      getAttendance={makeRemoteGetAttendance()}
      retrieveAttendance={makeRemoteRetrieveAttendance()}
      createAttendance={makeRemoteCreateAttendance()}
      getShippingInfo={makeRemoteGetShippingInfo()}
      {...props}
    />
  );
};
