import { StackScreenProps } from "@react-navigation/stack";
import { ReactNode } from "react";
import { RemoteGetAttendance } from "../../../data/usecases/attendance/get-attendance";
import { AxiosHttpClient } from "../../../infra/protocols/http/axios-http-client";
import {
  RootPrivateDrawerParamList,
  RootPrivateStackParamList,
} from "../../../presentation/routes";
import { Attendance } from "../../../presentation/screens/attendance/attendance";

type Props = StackScreenProps<RootPrivateStackParamList, "Attendance">;

export const makeAttendance = (props: Props) => {
  const url = "https://get-attendance-url";
  const httpGetClient = new AxiosHttpClient();

  const getAttendance = new RemoteGetAttendance(url, httpGetClient);

  return <Attendance getAttendance={getAttendance} {...props} />;
};
