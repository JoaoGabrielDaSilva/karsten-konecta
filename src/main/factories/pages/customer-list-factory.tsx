import { StackScreenProps } from "@react-navigation/stack";

import { RootPrivateStackParamList } from "../../../presentation/routes";
import { CustomerList } from "../../../presentation/screens/customer-list/customer-list";
import { makeRemoteGetActionCustomerList } from "../../usecases/action/remote-get-action-customer-list-factory";

type Props = StackScreenProps<RootPrivateStackParamList, "CustomerList">;

export const makeCustomerList = (props: Props) => {
  return (
    <CustomerList
      getCustomerList={makeRemoteGetActionCustomerList()}
      {...props}
    />
  );
};
