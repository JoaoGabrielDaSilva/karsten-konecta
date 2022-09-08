import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useTheme } from "styled-components/native";
import { AddProduct } from "../../../domain/usecases/attendance/add-product";
import { GetProductDetails } from "../../../domain/usecases/product/get-product-details";
import { GetProductGrid } from "../../../domain/usecases/product/get-product-grid";
import { GetShippingInfo } from "../../../domain/usecases/shipping/get-shipping-info";
import { Button } from "../../components/buttons/button/button";
import { Carousel } from "../../components/carousel/carousel";
import { ListRow } from "../../components/list/list-row/list-row";
import { ListRowLoader } from "../../components/list/list-row/loader/list-row-loader";
import { StoreStockModel } from "../../models/StoreStock";

import { RootPrivateStackParamList } from "../../routes";
import { useAttendanceStore } from "../../store/attendance";
import { ProductCarouselLoader } from "./layout/product-carousel/loader/product-carousel-loader";
import { ProductGrid } from "./layout/product-grid/product-grid";
import { ProductInfoLoader } from "./layout/product-info/loader/product-info-loader";
import { ProductInfo } from "./layout/product-info/product-info";
import { ShippingSection } from "./layout/shipping-section/shipping-section";
import { StockSectionLoader } from "./layout/stock-section/loader/stock-section-loader";
import { StockSection } from "./layout/stock-section/stock-section";
import { AdditionalInfo, Container, Footer } from "./styles";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "ProductDetails"
>;

const stocks: StoreStockModel[] = [
  {
    store: "Loja A",
    availableAmount: 5,
  },
  {
    store: "Loja B",
    availableAmount: 10,
  },
  {
    store: "Loja C",
    availableAmount: 2,
  },
  {
    store: "Loja D",
    availableAmount: 0,
  },
];

type Props = NavigationProps & {
  addProduct: AddProduct;
  getProductDetails: GetProductDetails;
  getProductGrid: GetProductGrid;
  getShippingInfo: GetShippingInfo;
};

export const ProductDetails = ({
  addProduct,
  getProductDetails,
  getProductGrid,
  getShippingInfo,
  route,
  navigation: { navigate },
}: Props) => {
  const { code, ean } = route.params;

  const theme = useTheme();
  const { id: attendanceId } = useAttendanceStore();

  const [selectedProductColorCode, setSelectedProductColorCode] =
    useState<string>(code);
  const [selectedProductSizeCode, setSelectedProductSizeCode] =
    useState<string>(code);

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<GetProductDetails.Model>();
  const [productGrid, setProductGrid] = useState<GetProductGrid.Model>();

  const [productAmount, setProductAmount] = useState(1);

  const handleDecrease = () => setProductAmount((amount) => amount - 1);

  const handleIncrease = () => setProductAmount((amount) => amount + 1);

  const handleChangeProductColorCode = (code: string) =>
    setSelectedProductColorCode(code);

  const handleChangeProductSizeCode = (code: string) =>
    setSelectedProductSizeCode(code);

  const handleChangeProduct = (code: string) => loadProductDetails(code);

  const handleAddProduct = () => {
    try {
      addProduct.add({
        amount: String(productAmount),
        attendanceId: attendanceId,
        productId: product.code,
        storeId: "28",
      });

      navigate("Attendance");
    } catch (error) {
      console.log(error);
    }
  };

  const loadProductDetails = async (code: string) => {
    try {
      setLoading(true);
      const productDetails = await getProductDetails.get({
        code,
        storeId: "28",
      });

      const productGrid = await getProductGrid.get({
        code,
        color: productDetails.color,
      });

      console.log(productGrid);

      setProduct(productDetails);
      setProductGrid(productGrid);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProductDetails(code);
  }, []);

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.select({ android: "height", ios: "padding" })}
        keyboardVerticalOffset={120}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: theme.spacing.xxl }}
        >
          {!loading ? (
            <Carousel
              images={product?.carouselImages}
              style={{ backgroundColor: theme.color.background.primary }}
            />
          ) : (
            <ProductCarouselLoader />
          )}
          {!loading ? (
            <ProductInfo
              {...product}
              amount={productAmount}
              decreaseAmount={handleDecrease}
              increaseAmount={handleIncrease}
            />
          ) : (
            <ProductInfoLoader />
          )}
          <ProductGrid
            grid={productGrid}
            selectedProductColorCode={selectedProductColorCode}
            selectedProductSizeCode={selectedProductSizeCode}
            handleChangeProduct={handleChangeProduct}
            handleChangeProductColorCode={handleChangeProductColorCode}
            handleChangeProductSizeCode={handleChangeProductSizeCode}
          />

          {!loading ? <StockSection stocks={stocks} /> : <StockSectionLoader />}
          <AdditionalInfo>
            {!loading ? (
              <>
                <ListRow label="Descrição" rightIcon="chevron-right" />
                <ListRow
                  label="Informações Adicionais"
                  rightIcon="chevron-right"
                />
                <ListRow
                  label="Especificação do Produto"
                  rightIcon="chevron-right"
                  borderless
                />
              </>
            ) : (
              <>
                <ListRowLoader value={false} rightIcon />
                <ListRowLoader value={false} rightIcon />
                <ListRowLoader value={false} rightIcon borderless />
              </>
            )}
          </AdditionalInfo>

          <ShippingSection
            getShippingInfo={getShippingInfo}
            loading={loading}
          />
        </ScrollView>
        <Footer>
          <Button text="Adicionar ao carrinho" onPress={handleAddProduct} />
        </Footer>
      </KeyboardAvoidingView>
    </Container>
  );
};