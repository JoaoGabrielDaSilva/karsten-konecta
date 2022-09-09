import { StackScreenProps } from "@react-navigation/stack";

import { RootPrivateStackParamList } from "../../../presentation/routes";
import { OrderList } from "../../../presentation/screens/order-list/order-list";
import { makeRemoteOrderList } from "../../usecases/attendance/remote-get-order-list-factory";

type Props = StackScreenProps<RootPrivateStackParamList, "OrderList">;

export const makeOrderList = (props: Props) => {
  return <OrderList getOrderList={makeRemoteOrderList()} {...props} />;
};
