import { StackScreenProps } from "@react-navigation/stack";

import { RootPrivateStackParamList } from "../../../presentation/routes";
import { StoreSelect } from "../../../presentation/screens/store-select/store-select";
import { makeRemoteGetStoreList } from "../../usecases/store/remote-get-store-list";

type Props = StackScreenProps<RootPrivateStackParamList, "StoreSelect">;

export const makeStoreSelect = (props: Props) => {
  return <StoreSelect getStoreList={makeRemoteGetStoreList()} {...props} />;
};
