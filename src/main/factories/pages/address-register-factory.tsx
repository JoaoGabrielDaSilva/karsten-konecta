import { StackScreenProps } from "@react-navigation/stack";

import { RootPrivateStackParamList } from "../../../presentation/routes";
import { AddressRegister } from "../../../presentation/screens/address-register/address-register";
import { makeRemoteGetAttendance } from "../../usecases/attendance/remote-get-attendance-factory";
import { makeRemoteGetAddressByCep } from "../../usecases/cep/remote-get-address-by-cep";
import { makeRemoteCreateCustomerAddress } from "../../usecases/customer/remote-create-customer-address-factory";
import { makeRemoteEditCustomerAddress } from "../../usecases/customer/remote-edit-customer-address-factory";
import { makeRemoteGetCustomerAddressList } from "../../usecases/customer/remote-get-customer-address-list-factory";

type Props = StackScreenProps<RootPrivateStackParamList, "AddressRegister">;

export const makeAddressRegister = (props: Props) => {
  return (
    <AddressRegister
      getAddressList={makeRemoteGetCustomerAddressList()}
      createAddress={makeRemoteCreateCustomerAddress()}
      editAddress={makeRemoteEditCustomerAddress()}
      getAddressByCep={makeRemoteGetAddressByCep()}
      getAttendance={makeRemoteGetAttendance()}
      {...props}
    />
  );
};
