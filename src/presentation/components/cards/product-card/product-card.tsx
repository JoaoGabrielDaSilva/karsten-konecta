import React from "react";
import { StyleProp, ViewStyle, Pressable } from "react-native";
import {
  Container,
  ImageWrapper,
  Image,
  Title,
  Code,
  Ean,
  InfoWrapper,
} from "./styles";

type ProductCardProps = {
  uri: string;
  name: string;
  code: string;
  ean: string;
};

type Props = ProductCardProps & {
  onPress?: (params: ProductCardProps) => void;
  style?: StyleProp<ViewStyle>;
};

export const ProductCard = ({ style, onPress, ...props }: Props) => {
  const { uri, name, code, ean } = props;

  return (
    <Pressable onPress={() => onPress({ ...props })}>
      <Container style={style}>
        <ImageWrapper>
          <Image source={{ uri }} resizeMode="contain" />
        </ImageWrapper>
        <InfoWrapper>
          <Title bold numberOfLines={3}>
            {name}
          </Title>
          <Code>Código: {code}</Code>
          <Ean>EAN: {ean}</Ean>
        </InfoWrapper>
      </Container>
    </Pressable>
  );
};
