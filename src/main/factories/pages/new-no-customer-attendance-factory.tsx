import { StackScreenProps } from "@react-navigation/stack";

import { RootPrivateStackParamList } from "../../../presentation/routes";
import { NewNoCustomerAttendance } from "../../../presentation/screens/new-no-customer-attendance/new-no-customer-attendance";

type Props = StackScreenProps<
  RootPrivateStackParamList,
  "NewNoCustomerAttendance"
>;

export const makeNewNoCustomerAttendance = (props: Props) => (
  <NewNoCustomerAttendance {...props} />
);
