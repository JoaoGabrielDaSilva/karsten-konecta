import { StackScreenProps } from "@react-navigation/stack";

import { RootPrivateStackParamList } from "../../../presentation/routes";
import { SaleLinkAttendance } from "../../../presentation/screens/sale-link-attendance/sale-link-attendance";

type Props = StackScreenProps<RootPrivateStackParamList, "SaleLinkAttendance">;

export const makeSaleLinkAttendance = (props: Props) => {
  return <SaleLinkAttendance {...props} />;
};
