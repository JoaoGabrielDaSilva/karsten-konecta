import React from "react";
import {
  FlatList,
  ListRenderItemInfo,
  TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from "styled-components/native";
import { GetProductDetails } from "../../../../../domain/usecases/product/get-product-details";
import { GetProductGrid } from "../../../../../domain/usecases/product/get-product-grid";
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
  grid: GetProductGrid.Model;
  selectedProductColorCode: string;
  selectedProductSizeCode: string;
  handleChangeProductColorCode: (code: string) => void;
  handleChangeProductSizeCode: (code: string) => void;
  handleChangeProduct: (code: string) => void;
};

export const ProductGrid = ({
  grid,
  selectedProductColorCode,
  selectedProductSizeCode,
  handleChangeProductColorCode,
  handleChangeProductSizeCode,

  handleChangeProduct,
}: Props) => {
  const theme = useTheme();

  const hasColorList = grid?.colorList.length > 0;

  const sizeList = grid?.colorList?.find(
    (item) => item.code === selectedProductColorCode
  )?.sizeList;

  const hasSizeList = sizeList?.length > 0;

  return (
    (hasColorList || hasSizeList) && (
      <Container>
        {hasColorList ? (
          <>
            <SectionTitle bold variant="heading">
              Cor
            </SectionTitle>
            <FlatList
              data={grid?.colorList}
              keyExtractor={(_, index) => String(index)}
              renderItem={({ item }) => {
                console.log(item.code, selectedProductColorCode);

                const selected = item.code === selectedProductColorCode;

                return (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      if (!hasSizeList) {
                        return handleChangeProduct(item.code);
                      }
                      handleChangeProductColorCode(item.code);
                    }}
                  >
                    <ImageWrapper selected={selected}>
                      <Image source={{ uri: item.uri }} />
                    </ImageWrapper>
                  </TouchableWithoutFeedback>
                );
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: theme.spacing.lg }}
            />
          </>
        ) : null}

        {hasSizeList ? (
          <>
            <SectionTitle bold variant="heading">
              Tamanho
            </SectionTitle>
            <FlatList
              data={sizeList}
              keyExtractor={(_, index) => String(Math.random() * index)}
              renderItem={({ item }) => {
                const selected = item.code === selectedProductSizeCode;

                return (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      if (selectedProductColorCode || !hasColorList) {
                        handleChangeProduct(item.code);
                        handleChangeProductSizeCode(item.code);
                      }
                    }}
                  >
                    <SizeWrapper selected={selected}>
                      <SizeText selected={selected}>{item.size}</SizeText>
                    </SizeWrapper>
                  </TouchableWithoutFeedback>
                );
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </>
        ) : null}
      </Container>
    )
  );
};
