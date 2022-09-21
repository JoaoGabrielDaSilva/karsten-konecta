import { StackScreenProps } from "@react-navigation/stack";

import { RootPrivateStackParamList } from "../../../presentation/routes";
import { AddressSelect } from "../../../presentation/screens/address-select/address-select";
import { makeRemoteUpdateDeliveryAddress } from "../../usecases/attendance/remote-update-attendance-delivery-address-factory";
import { makeRemoteUpdatePickupAddress } from "../../usecases/attendance/remote-update-attendance-pickup-address-factory";
import { makeRemoteGetCustomerAddressList } from "../../usecases/customer/remote-get-customer-address-list-factory";
import { makeRemoteGetStoreAddressList } from "../../usecases/store/remote-get-store-address-list-factory";

type Props = StackScreenProps<RootPrivateStackParamList, "AddressSelect">;

export const makeAddressSelect = (props: Props) => {
  return (
    <AddressSelect
      getCustomerAddressList={makeRemoteGetCustomerAddressList()}
      getStoreAddressList={makeRemoteGetStoreAddressList()}
      updateAttendanceDeliveryAddress={makeRemoteUpdateDeliveryAddress()}
      updateAttendancePickupAddress={makeRemoteUpdatePickupAddress()}
      {...props}
    />
  );
};
