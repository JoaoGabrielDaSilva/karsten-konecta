import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import { Platform, FlatList } from "react-native";
import { useTheme } from "styled-components/native";
import { AddProduct } from "../../../domain/usecases/attendance/add-product";
import { GetAttendance } from "../../../domain/usecases/attendance/get-attendance";
import { GetProductDetails } from "../../../domain/usecases/product/get-product-details";
import { GetProductGrid } from "../../../domain/usecases/product/get-product-grid";
import { GetShippingInfo } from "../../../domain/usecases/shipping/get-shipping-info";
import { Button } from "../../components/buttons/button/button";
import { Carousel } from "../../components/carousel/carousel";
import { ListRow } from "../../components/list/list-row/list-row";
import { ListRowLoader } from "../../components/list/list-row/loader/list-row-loader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

import { RootPrivateStackParamList } from "../../routes";
import { useAttendanceStore } from "../../store/attendance";
import { useUserStore } from "../../store/user";
import { ProductCarouselLoader } from "./layout/product-carousel/loader/product-carousel-loader";
import { ProductGrid } from "./layout/product-grid/product-grid";
import { ProductInfoLoader } from "./layout/product-info/loader/product-info-loader";
import { ProductInfo } from "./layout/product-info/product-info";
import { ShippingSection } from "./layout/shipping-section/shipping-section";
import { StockSection } from "./layout/stock-section/stock-section";
import {
  AdditionalInfo,
  AdditionalInfoLoader,
  Container,
  Footer,
  SuggestedProductsTitle,
  SuggestedProductsTitleLoader,
} from "./styles";
import { GetProductStock } from "../../../domain/usecases/stock/get-product-stock";
import { StockModel } from "../../../domain/models/stock-model";
import { ProductCard } from "../../components/cards/product-card/product-card";
import { Row, SectionTitle } from "../../components/utils";
import { ProductCardLoader } from "../../components/cards/product-card/loader/product-card-loader";
import { BottomTab } from "../../components/navigation/bottom-tab/bottom-tab";
import { ProductGridLoader } from "./layout/product-grid/loader/product-grid-loader";
import { ScrollView } from "react-native-gesture-handler";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "ProductDetails"
>;

type Props = NavigationProps & {
  addProduct: AddProduct;
  getProductDetails: GetProductDetails;
  getProductGrid: GetProductGrid;
  getShippingInfo: GetShippingInfo;
  getAttendance: GetAttendance;
  getProductStock: GetProductStock;
};

export const ProductDetails = ({
  addProduct,
  getProductDetails,
  getProductGrid,
  getShippingInfo,
  getAttendance,
  getProductStock,
  route,
  navigation: { navigate },
}: Props) => {
  const { code, ean } = route.params;

  const theme = useTheme();
  const { id: attendanceId, setAttendance } = useAttendanceStore();

  const { store } = useUserStore();

  const scrollviewRef = useRef<ScrollView>();

  const [selectedProductColorCode, setSelectedProductColorCode] =
    useState<string>(code);
  const [selectedProductSizeCode, setSelectedProductSizeCode] =
    useState<string>(code);

  const [loading, setLoading] = useState(true);
  const [addingProduct, setAddingProduct] = useState(false);
  const [product, setProduct] = useState<GetProductDetails.Model>();
  const [productGrid, setProductGrid] = useState<GetProductGrid.Model>();
  const [stockList, setStockList] = useState<StockModel[]>();

  const [productAmount, setProductAmount] = useState(1);

  const handleDecrease = () => setProductAmount((amount) => amount - 1);

  const handleIncrease = () => setProductAmount((amount) => amount + 1);

  const handleChangeProductColorCode = (code: string) =>
    setSelectedProductColorCode(code);

  const handleChangeProductSizeCode = (code: string) =>
    setSelectedProductSizeCode(code);

  const handleChangeProduct = (code: string) => {
    loadProductDetails(code);
    setProductAmount(1);
    scrollviewRef.current.scrollTo({ y: 0 });
  };

  const handleAddProduct = async () => {
    try {
      if (!attendanceId) {
        navigate("AttendanceSelect", {
          product: {
            code: product.code,
            amount: String(productAmount),
          },
        });
        return;
      }

      setAddingProduct(true);
      await addProduct.add({
        amount: String(productAmount),
        attendanceId: attendanceId,
        productId: product.code,
        storeId: store.id,
      });

      const attendance = await getAttendance.get({
        id: attendanceId,
        storeId: store.id,
      });

      setAttendance({ ...attendance });

      setAddingProduct(false);

      navigate("Attendance");
    } catch (error) {
      setAddingProduct(false);

      console.log(error);
    }
  };

  const loadProductDetails = async (code: string) => {
    try {
      setLoading(true);
      const productDetails = await getProductDetails.get({
        code,
        storeId: store.id,
      });

      setProduct(productDetails);

      const productGrid = await getProductGrid.get({
        code,
        color: productDetails.color,
      });

      handleChangeProductColorCode(
        productGrid.colorList.find((item) => item.code === productDetails.code)
          ?.code
      );
      handleChangeProductSizeCode(null);

      setProductGrid(productGrid);

      const { stockList } = await getProductStock.execute({ ean });

      setStockList(stockList);
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
      <KeyboardAwareScrollView
        ref={scrollviewRef}
        contentContainerStyle={{
          paddingBottom: theme.spacing.xxl * 2,
        }}
        behavior={Platform.select({ android: "height", ios: "padding" })}
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
            disabled={loading}
            maxAmount={
              store.isMultiBrand
                ? stockList?.find((item) => item.locale === "E-COMMERCE KSA")
                    ?.availableAmount
                : null
            }
            amount={productAmount}
            decreaseAmount={handleDecrease}
            increaseAmount={handleIncrease}
          />
        ) : (
          <ProductInfoLoader />
        )}
        {!loading ? (
          <ProductGrid
            grid={productGrid}
            selectedProductColorCode={selectedProductColorCode}
            selectedProductSizeCode={selectedProductSizeCode}
            handleChangeProduct={handleChangeProduct}
            handleChangeProductColorCode={handleChangeProductColorCode}
            handleChangeProductSizeCode={handleChangeProductSizeCode}
          />
        ) : (
          <ProductGridLoader />
        )}

        <StockSection stocks={stockList} loading={loading} />

        {!loading ? (
          <AdditionalInfo>
            <ListRow label="Descrição" rightIcon="chevron-right" />
            <ListRow label="Informações Adicionais" rightIcon="chevron-right" />
            <ListRow
              label="Especificação do Produto"
              rightIcon="chevron-right"
              borderless
            />
          </AdditionalInfo>
        ) : (
          <AdditionalInfoLoader>
            <ListRowLoader value={false} rightIcon />
            <ListRowLoader value={false} rightIcon />
            <ListRowLoader value={false} rightIcon borderless />
          </AdditionalInfoLoader>
        )}

        <ShippingSection getShippingInfo={getShippingInfo} loading={loading} />
        {!loading ? (
          product?.suggestions ? (
            <>
              <SuggestedProductsTitle>
                Produtos Sugeridos
              </SuggestedProductsTitle>
              <FlatList
                data={product.suggestions}
                horizontal
                keyExtractor={(item) => String(item.code)}
                renderItem={({ item }) => (
                  <ProductCard
                    {...item}
                    onPress={({ code }) => handleChangeProduct(code)}
                    style={{
                      marginHorizontal: theme.spacing.md,
                    }}
                  />
                )}
                showsHorizontalScrollIndicator={false}
              />
            </>
          ) : null
        ) : (
          <>
            <SuggestedProductsTitleLoader width={150} height={20} />
            <Row>
              <ProductCardLoader
                style={{
                  marginHorizontal: theme.spacing.md,
                }}
              />
              <ProductCardLoader
                style={{
                  marginHorizontal: theme.spacing.md,
                }}
              />
            </Row>
          </>
        )}
      </KeyboardAwareScrollView>
      <Footer>
        <Button
          text="Adicionar ao carrinho"
          onPress={handleAddProduct}
          disabled={loading}
          loading={addingProduct}
        />
      </Footer>
      <BottomTab />
    </Container>
  );
};
