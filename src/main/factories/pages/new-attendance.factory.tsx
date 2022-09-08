import { StackScreenProps } from "@react-navigation/stack";

import { RootPrivateStackParamList } from "../../../presentation/routes";
import { NewAttendance } from "../../../presentation/screens";
import { makeRemoteGetCustomer } from "../../usecases/customer/remote-get-customer-factory";

type Props = StackScreenProps<RootPrivateStackParamList, "NewAttendance">;

export const makeNewAttendance = (props: Props) => {
  return <NewAttendance getCustomer={makeRemoteGetCustomer()} {...props} />;
};
