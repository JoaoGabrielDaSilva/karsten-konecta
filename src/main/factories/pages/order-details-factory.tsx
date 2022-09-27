import { StackScreenProps } from "@react-navigation/stack";

import { RootPrivateStackParamList } from "../../../presentation/routes";
import { OrderDetails } from "../../../presentation/screens/order-details/order-details";
import { makeRemoteGetOrderDetails } from "../../usecases/order/remote-get-order-details-factory";

type Props = StackScreenProps<RootPrivateStackParamList, "OrderDetails">;

export const makeOrderDetails = (props: Props) => {
  return (
    <OrderDetails getOrderDetails={makeRemoteGetOrderDetails()} {...props} />
  );
};
