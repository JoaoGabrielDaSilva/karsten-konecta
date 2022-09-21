import React from "react";
import { StyleProp, ViewStyle, Dimensions } from "react-native";
import { useTheme } from "styled-components/native";
import { Row } from "../../../../../components/utils";

import { Container, SectionTitle, ProductColor, ProductSize } from "./styles";

type Props = {
  style?: StyleProp<ViewStyle>;
};

const { width } = Dimensions.get("window");

const PRODUCT_IMAGE_SIZE = width * 0.18;

export const ProductGridLoader = ({ style }: Props) => {
  const theme = useTheme();

  return (
    <Container style={style}>
      <SectionTitle width={50} height={20} />
      <Row>
        <ProductColor
          width={PRODUCT_IMAGE_SIZE}
          height={PRODUCT_IMAGE_SIZE}
          borderRadius={theme.radii.md}
        />
        <ProductColor
          width={PRODUCT_IMAGE_SIZE}
          height={PRODUCT_IMAGE_SIZE}
          borderRadius={theme.radii.md}
        />
        <ProductColor
          width={PRODUCT_IMAGE_SIZE}
          height={PRODUCT_IMAGE_SIZE}
          borderRadius={theme.radii.md}
        />
        <ProductColor
          width={PRODUCT_IMAGE_SIZE}
          height={PRODUCT_IMAGE_SIZE}
          borderRadius={theme.radii.md}
        />
      </Row>
      <SectionTitle width={100} height={20} />
      <Row>
        <ProductSize width={80} height={22} borderRadius={theme.radii.sm} />
        <ProductSize width={80} height={22} borderRadius={theme.radii.sm} />
        <ProductSize width={80} height={22} borderRadius={theme.radii.sm} />
      </Row>
    </Container>
  );
};
