import { StackScreenProps } from "@react-navigation/stack";

import { RootPrivateStackParamList } from "../../../presentation/routes";
import { ProductDetails } from "../../../presentation/screens/product-details/product-details";
import { makeRemoteAddProduct } from "../../usecases/attendance/remote-add-product";
import { makeRemoteGetAttendance } from "../../usecases/attendance/remote-get-attendance-factory";
import { makeRemoteGetProductDetails } from "../../usecases/product/remote-get-product-details";
import { makeRemoteGetProductGrid } from "../../usecases/product/remote-get-product-grid";
import { makeRemoteGetShippingInfo } from "../../usecases/shipping/remote-get-shipping-info";
import { makeRemoteGetProductStock } from "../../usecases/stock/remote-get-product-stock-factory";

type Props = StackScreenProps<RootPrivateStackParamList, "ProductDetails">;

export const makeProductDetails = (props: Props) => {
  return (
    <ProductDetails
      addProduct={makeRemoteAddProduct()}
      getProductDetails={makeRemoteGetProductDetails()}
      getProductGrid={makeRemoteGetProductGrid()}
      getAttendance={makeRemoteGetAttendance()}
      getShippingInfo={makeRemoteGetShippingInfo()}
      getProductStock={makeRemoteGetProductStock()}
      {...props}
    />
  );
};
