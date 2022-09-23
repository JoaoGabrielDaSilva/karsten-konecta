import { StackScreenProps } from "@react-navigation/stack";

import { RootPrivateStackParamList } from "../../../presentation/routes";
import { AttendanceList } from "../../../presentation/screens/attendance-list/attendance-list";
import { AttendanceRefreshedProducts } from "../../../presentation/screens/attendance-refreshed-products/attendance-refreshed-products";
import { makeRemoteGetAttendance } from "../../usecases/attendance/remote-get-attendance-factory";
import { makeRemoteGetAttendanceList } from "../../usecases/attendance/remote-get-attendance-list";
import { makeRemoteVerifyAttendanceProducts } from "../../usecases/attendance/remote-verify-attendance-products-factory";

type Props = StackScreenProps<
  RootPrivateStackParamList,
  "AttendanceRefreshedProducts"
>;

export const makeAttendanceRefreshedProducts = (props: Props) => {
  return (
    <AttendanceRefreshedProducts
      verifyAttendanceProducts={makeRemoteVerifyAttendanceProducts()}
      getAttendance={makeRemoteGetAttendance()}
      {...props}
    />
  );
};
