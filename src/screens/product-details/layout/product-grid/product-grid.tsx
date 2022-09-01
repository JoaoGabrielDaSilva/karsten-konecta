import React from "react";
import {
  FlatList,
  ListRenderItemInfo,
  TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from "styled-components/native";
import { ProductDetailsModel } from "../../../../models/Product";
import {
  Container,
  Image,
  ImageWrapper,
  SectionTitle,
  SizeText,
  SizeWrapper,
} from "./styles";

type Props = {
  selectedProduct: ProductDetailsModel;
  selectedProductSize: string;
  products: ProductDetailsModel[];
  handleChangeProduct: (code: string) => void;
  handleChangeProductSize: (size: string) => void;
};

export const ProductGrid = ({
  products,
  handleChangeProduct,
  selectedProduct,
  selectedProductSize,
  handleChangeProductSize,
}: Props) => {
  const theme = useTheme();
  return (
    <Container>
      <SectionTitle bold variant="heading">
        Cor
      </SectionTitle>
      <FlatList
        data={products}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item }: ListRenderItemInfo<ProductDetailsModel>) => {
          const selected = selectedProduct.code === item.code;

          return (
            <TouchableWithoutFeedback
              onPress={() => handleChangeProduct(item.code)}
            >
              <ImageWrapper selected={selected}>
                <Image source={{ uri: item.images[0] }} />
              </ImageWrapper>
            </TouchableWithoutFeedback>
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: theme.spacing.lg }}
      />
      <SectionTitle bold variant="heading">
        Tamanho
      </SectionTitle>
      <FlatList
        data={selectedProduct.sizes}
        keyExtractor={(_, index) => String(Math.random() * index)}
        renderItem={({ item }: ListRenderItemInfo<string>) => {
          const selected = selectedProductSize === item;

          return (
            <TouchableWithoutFeedback
              onPress={() => handleChangeProductSize(item)}
            >
              <SizeWrapper selected={selected}>
                <SizeText selected={selected}>{item}</SizeText>
              </SizeWrapper>
            </TouchableWithoutFeedback>
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
};
