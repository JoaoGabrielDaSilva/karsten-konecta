import { StackScreenProps } from "@react-navigation/stack";

import { RootPrivateStackParamList } from "../../../presentation/routes";
import { ProductList } from "../../../presentation/screens/product-list/product-list";
import { makeRemoteGetSearchHistory } from "../../usecases/customer/remote-get-search-history-factory";
import { makeRemoteGetProductList } from "../../usecases/product/remote-get-product-list-factory";

type Props = StackScreenProps<RootPrivateStackParamList, "ProductList">;

export const makeProductList = (props: Props) => {
  return (
    <ProductList
      getProductList={makeRemoteGetProductList()}
      getSearchHistory={makeRemoteGetSearchHistory()}
      {...props}
    />
  );
};
