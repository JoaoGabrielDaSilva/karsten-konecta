import { StackScreenProps } from "@react-navigation/stack";

import { RootPrivateStackParamList } from "../../../presentation/routes";
import { AddressSelect } from "../../../presentation/screens/address-select/address-select";
import { makeRemoteGetCustomerAddressList } from "../../usecases/customer/remote-get-customer-address-list-factory";

type Props = StackScreenProps<RootPrivateStackParamList, "AddressSelect">;

export const makeAddressSelect = (props: Props) => {
  return (
    <AddressSelect
      getCustomerAddressList={makeRemoteGetCustomerAddressList()}
      {...props}
    />
  );
};
