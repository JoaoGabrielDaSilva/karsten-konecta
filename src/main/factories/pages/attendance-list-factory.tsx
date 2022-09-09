import { StackScreenProps } from "@react-navigation/stack";

import { RootPrivateStackParamList } from "../../../presentation/routes";
import { AttendanceList } from "../../../presentation/screens/attendance-list/attendance-list";
import { makeRemoteGetAttendanceList } from "../../usecases/attendance/remote-get-attendance-list";

type Props = StackScreenProps<RootPrivateStackParamList, "AttendanceList">;

export const makeAttendanceList = (props: Props) => {
  return (
    <AttendanceList
      getAttendanceList={makeRemoteGetAttendanceList()}
      {...props}
    />
  );
};
