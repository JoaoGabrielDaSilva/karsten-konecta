import { StackScreenProps } from "@react-navigation/stack";
import { RootPrivateStackParamList } from "../../../presentation/routes";
import { AttendanceSelect } from "../../../presentation/screens/attendance-select/attendance-select";
import { makeRemoteAddProduct } from "../../usecases/attendance/remote-add-product";
import { makeRemoteGetAttendance } from "../../usecases/attendance/remote-get-attendance-factory";
import { makeRemoteGetAttendanceList } from "../../usecases/attendance/remote-get-attendance-list";

type Props = StackScreenProps<RootPrivateStackParamList, "AttendanceSelect">;

export const makeAttendanceSelect = (props: Props) => {
  return (
    <AttendanceSelect
      getAttendanceList={makeRemoteGetAttendanceList()}
      addProduct={makeRemoteAddProduct()}
      getAttendance={makeRemoteGetAttendance()}
      {...props}
    />
  );
};
