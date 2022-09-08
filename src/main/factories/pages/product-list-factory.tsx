import { StackScreenProps } from "@react-navigation/stack";

import { RootPrivateStackParamList } from "../../../presentation/routes";
import { ProductList } from "../../../presentation/screens/product-list/product-list";
import { makeRemoteGetProductList } from "../../usecases/product/remote-get-product-list-factory";

type Props = StackScreenProps<RootPrivateStackParamList, "ProductList">;

export const makeProductList = (props: Props) => {
  return <ProductList getProductList={makeRemoteGetProductList()} {...props} />;
};
