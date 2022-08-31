import React from "react";
import { StyleProp, ViewStyle } from "react-native";

import { ProductModel } from "../../../models/Product";

import {
  Container,
  Left,
  Right,
  Image,
  ImageWrapper,
  Name,
  Label,
  Code,
  Ean,
  Col,
} from "./styles";

type Props = ProductModel & {
  borderless?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const ListProduct = ({
  name,
  code,
  ean,
  uri,
  borderless,
  style,
}: Props) => {
  return (
    <Container borderless={borderless} style={style}>
      <Left>
        <ImageWrapper>
          <Image source={{ uri }} resizeMode="contain" />
        </ImageWrapper>
      </Left>
      <Right>
        <Name>{name}</Name>

        <Col>
          <Code>
            <Label>Código: </Label>
            {code}
          </Code>
          <Ean>
            <Label>EAN: </Label>
            {ean}
          </Ean>
        </Col>
      </Right>
    </Container>
  );
};
