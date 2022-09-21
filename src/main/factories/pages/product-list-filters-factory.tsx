import { StackScreenProps } from "@react-navigation/stack";

import { RootPrivateStackParamList } from "../../../presentation/routes";
import { ProductListFilters } from "../../../presentation/screens/product-list-filters/product-list-filters";
import { makeRemoteGetProductCategories } from "../../usecases/product/remote-get-product-categories-factory";

type Props = StackScreenProps<RootPrivateStackParamList, "ProductListFilters">;

export const makeProductListFilters = (props: Props) => {
  return (
    <ProductListFilters
      getProductCategories={makeRemoteGetProductCategories()}
      {...props}
    />
  );
};
