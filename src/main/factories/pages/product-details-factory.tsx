import { StackScreenProps } from "@react-navigation/stack";

import { RootPrivateStackParamList } from "../../../presentation/routes";
import { ProductDetails } from "../../../presentation/screens/product-details/product-details";
import { makeRemoteAddProduct } from "../../usecases/attendance/remote-add-product";
import { makeRemoteGetProductDetails } from "../../usecases/product/remote-get-product-details";
import { makeRemoteGetProductGrid } from "../../usecases/product/remote-get-product-grid";
import { makeRemoteGetShippingInfo } from "../../usecases/shipping/remote-get-shipping-info";

type Props = StackScreenProps<RootPrivateStackParamList, "ProductDetails">;

export const makeProductDetails = (props: Props) => {
  return (
    <ProductDetails
      addProduct={makeRemoteAddProduct()}
      getProductDetails={makeRemoteGetProductDetails()}
      getProductGrid={makeRemoteGetProductGrid()}
      getShippingInfo={makeRemoteGetShippingInfo()}
      {...props}
    />
  );
};
