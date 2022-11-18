import { StackScreenProps } from "@react-navigation/stack";
import { memo } from "react";

import { RootPrivateStackParamList } from "../../../presentation/routes";
import { NewNoCustomerAttendance } from "../../../presentation/screens/new-no-customer-attendance/new-no-customer-attendance";

type Props = StackScreenProps<
  RootPrivateStackParamList,
  "NewNoCustomerAttendance"
>;

const MakeNewNoCustomerAttendance = (props: Props) => (
  <NewNoCustomerAttendance {...props} />
);

export default memo(MakeNewNoCustomerAttendance);
