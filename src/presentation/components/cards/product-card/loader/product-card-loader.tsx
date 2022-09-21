import React from "react";
import { StyleProp, ViewStyle, Dimensions } from "react-native";
import { useTheme } from "styled-components/native";
import {
  Container,
  ImageWrapper,
  Image,
  FirstTitleLine,
  SecondTitleLine,
  Code,
  Ean,
  ThirdTitleLine,
} from "./styles";

type Props = {
  style?: StyleProp<ViewStyle>;
};

const { width } = Dimensions.get("window");

const CARD_WIDTH = width * 0.5 > 250 ? 250 : width * 0.5;
const CARD_HEIGHT = width * 0.7;

export const ProductCardLoader = ({ style }: Props) => {
  const theme = useTheme();

  return (
    <Container style={style}>
      <ImageWrapper>
        <Image
          width={CARD_WIDTH * 0.85}
          height={CARD_HEIGHT * 0.5}
          borderRadius={theme.radii.md}
        />
      </ImageWrapper>
      <FirstTitleLine width={CARD_WIDTH * 0.8} height={12} />
      <SecondTitleLine width={CARD_WIDTH * 0.6} height={12} />
      <ThirdTitleLine width={CARD_WIDTH * 0.3} height={12} />

      <Code width={CARD_WIDTH * 0.5} height={12} />
      <Ean width={CARD_WIDTH * 0.65} height={12} />
    </Container>
  );
};
