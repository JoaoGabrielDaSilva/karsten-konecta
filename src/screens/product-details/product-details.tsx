import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useTheme } from "styled-components/native";
import { Button } from "../../components/buttons/button/button";
import { Carousel } from "../../components/carousel/carousel";
import { ListRow } from "../../components/list/list-row/list-row";
import { ProductDetailsModel } from "../../models/Product";
import { StoreStockModel } from "../../models/StoreStock";

import { RootPrivateStackParamList } from "../../routes";
import { ProductGrid } from "./layout/product-grid/product-grid";
import { ProductInfo } from "./layout/product-info/product-info";
import { ShippingSection } from "./layout/shipping-section/shipping-section";
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

const products: ProductDetailsModel[] = [
  {
    name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
    code: "1213",
    images: [
      "https://karsten.vtexassets.com/arquivos/ids/175888/3672192_01.jpg?v=637521280680300000",
      "https://karsten.vtexassets.com/arquivos/ids/175890/3672192_02.jpg?v=637521280833200000",
      "https://karsten.vtexassets.com/arquivos/ids/182641/3672192_03.jpg?v=637938558047330000",
    ],
    ean: "17559272547197",
    sizes: ["KING", "QUEEN"],
  },
  {
    name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
    code: "4567",
    images: [
      "https://karsten.vtexassets.com/arquivos/ids/175318/3671934_01.jpg?v=637515223622700000",
      "https://karsten.vtexassets.com/arquivos/ids/175319/3671934_02.jpg?v=637515223920170000",
      "https://karsten.vtexassets.com/arquivos/ids/182346/3671934_03.jpg?v=637938284531530000",
      "https://karsten.vtexassets.com/arquivos/ids/182346/3671934_03.jpg?v=637938284531530000",
    ],
    ean: "17559272547197",
    sizes: ["KING", "QUEEN"],
  },
  {
    name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
    code: "8910",
    images: [
      "https://karsten.vtexassets.com/arquivos/ids/175318/3671934_01.jpg?v=637515223622700000",
      "https://karsten.vtexassets.com/arquivos/ids/175319/3671934_02.jpg?v=637515223920170000",
      "https://karsten.vtexassets.com/arquivos/ids/182346/3671934_03.jpg?v=637938284531530000",
      "https://karsten.vtexassets.com/arquivos/ids/182346/3671934_03.jpg?v=637938284531530000",
    ],
    ean: "17559272547197",
    sizes: ["KING", "TESTE"],
  },
];

type Props = NavigationProps;

export const ProductDetails = ({}: Props) => {
  const theme = useTheme();

  const [selectedProductCode, setSelectedProductCode] = useState<string>(
    products[0].code
  );

  const product: ProductDetailsModel = useMemo(() => {
    return products.find((product) => product.code === selectedProductCode);
  }, [selectedProductCode]);

  const [selectedProductSize, setSelectedProductSize] = useState<string>(
    product.sizes[0]
  );

  const [productAmount, setProductAmount] = useState(1);

  const handleDecrease = () => setProductAmount((amount) => amount - 1);

  const handleIncrease = () => setProductAmount((amount) => amount + 1);

  const handleChangeProduct = (code: string) => {
    setSelectedProductCode(code);
  };

  const handleChangeProductSize = (size: string) =>
    setSelectedProductSize(size);

  useEffect(() => {
    console.log("RENDER");

    if (!product.sizes.includes(selectedProductSize)) {
      setSelectedProductSize(product.sizes[0]);
    }
  }, [product]);

  return (
    <Container>
      {/* <KeyboardAvoidingView
        behavior={Platform.select({ android: "height", ios: "padding" })}
        keyboardVerticalOffset={120}
      > */}
      <ScrollView contentContainerStyle={{ paddingBottom: theme.spacing.xxl }}>
        <Carousel
          images={product.images}
          style={{ backgroundColor: theme.color.background.primary }}
        />
        <ProductInfo
          {...product}
          uri={product.images[0]}
          amount={productAmount}
          decreaseAmount={handleDecrease}
          increaseAmount={handleIncrease}
        />
        <ProductGrid
          products={products}
          selectedProduct={product}
          selectedProductSize={selectedProductSize}
          handleChangeProduct={handleChangeProduct}
          handleChangeProductSize={handleChangeProductSize}
        />
        <StockSection stocks={stocks} />
        <AdditionalInfo>
          <ListRow label="Descrição" rightIcon="chevron-right" />
          <ListRow label="Informações Adicionais" rightIcon="chevron-right" />
          <ListRow
            label="Especificação do Produto"
            rightIcon="chevron-right"
            borderless
          />
        </AdditionalInfo>
        <ShippingSection />
      </ScrollView>
      <Footer>
        <Button text="Adicionar ao carrinho" onPress={() => {}} />
      </Footer>
      {/* </KeyboardAvoidingView> */}
    </Container>
  );
};
