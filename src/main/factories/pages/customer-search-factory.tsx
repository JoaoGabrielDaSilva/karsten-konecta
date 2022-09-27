import { StackScreenProps } from "@react-navigation/stack";

import { RootPrivateStackParamList } from "../../../presentation/routes";
import { CustomerSearch } from "../../../presentation/screens/customer-search/customer-search";
import { makeRemoteGetAtionCustomerDetails } from "../../usecases/action/remote-get-action-customer-details-factory";

type Props = StackScreenProps<RootPrivateStackParamList, "CustomerSearch">;

export const makeCustomerSearch = (props: Props) => {
  return (
    <CustomerSearch
      getCustomer={makeRemoteGetAtionCustomerDetails()}
      {...props}
    />
  );
};
