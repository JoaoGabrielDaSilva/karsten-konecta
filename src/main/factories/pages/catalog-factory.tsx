import { StackScreenProps } from "@react-navigation/stack";

import { RootPrivateStackParamList } from "../../../presentation/routes";
import { Catalog } from "../../../presentation/screens/catalog/catalog";
import { makeRemoteGetProductCategories } from "../../usecases/product/remote-get-product-categories-factory";
import { makeRemoteGetBestSellersProducts } from "../../usecases/report/remote-get-best-sellers-products-factory";
import { makeRemoteGetRecentProducts } from "../../usecases/report/remote-get-recent-products-factory";

type Props = StackScreenProps<RootPrivateStackParamList, "Catalog">;

export const makeCatalog = (props: Props) => {
  return (
    <Catalog
      getRecentProducts={makeRemoteGetRecentProducts()}
      getBestSellersProducts={makeRemoteGetBestSellersProducts()}
      getProductCategories={makeRemoteGetProductCategories()}
      {...props}
    />
  );
};
