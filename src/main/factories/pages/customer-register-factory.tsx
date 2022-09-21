import { StackScreenProps } from "@react-navigation/stack";

import { RootPrivateStackParamList } from "../../../presentation/routes";
import { CustomerRegister } from "../../../presentation/screens/customer-register/customer-register";
import { makeRemoteLinkCustomerToAttendance } from "../../usecases/attendance/remote-link-customer-to-attendance";
import { makeRemoteCreateCustomer } from "../../usecases/customer/remote-create-customer-factory";
import { makeRemoteEditCustomer } from "../../usecases/customer/remote-edit-customer-factory";
import { makeRemoteGetCustomer } from "../../usecases/customer/remote-get-customer-factory";

type Props = StackScreenProps<RootPrivateStackParamList, "CustomerRegister">;

export const makeCustomerRegister = (props: Props) => {
  return (
    <CustomerRegister
      getCustomer={makeRemoteGetCustomer()}
      createCustomer={makeRemoteCreateCustomer()}
      editCustomer={makeRemoteEditCustomer()}
      linkCustomer={makeRemoteLinkCustomerToAttendance()}
      {...props}
    />
  );
};
