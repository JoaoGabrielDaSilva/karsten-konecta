import React from "react";
import { StyleProp, ViewStyle, Pressable } from "react-native";
import { ProductModel } from "../../../../domain/models/product";
import {
  Container,
  ImageWrapper,
  Image,
  Title,
  Code,
  Ean,
  InfoWrapper,
} from "./styles";

export type ProductCardProps = Omit<
  ProductModel,
  "amount" | "hasAvailableAmount" | "price" | "weight"
> & {
  onPress?: (params: ProductCardProps) => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export const ProductCard = ({ style, onPress, ...props }: ProductCardProps) => {
  const { uri, name, code, ean } = props;

  return (
    <Pressable
      onPress={() => onPress && onPress({ uri, name, code, ean })}
      {...props}
    >
      <Container style={style}>
        <ImageWrapper>
          <Image
            testID={`${props.testID}-image`}
            source={{ uri }}
            resizeMode="contain"
          />
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
