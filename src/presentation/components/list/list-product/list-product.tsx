import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { ProductModel } from "../../../../domain/models/product";

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
  AmountContainer,
  Amount,
} from "./styles";

export type ListProductProps = ProductModel & {
  borderless?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export const ListProduct = ({
  name,
  code,
  ean,
  uri,
  borderless,
  amount,
  style,
  testID,
}: ListProductProps) => {
  return (
    <Container borderless={borderless} style={style} testID={testID}>
      <Left>
        <ImageWrapper>
          <Image source={{ uri }} resizeMode="cover" />
        </ImageWrapper>
        {amount || amount === 0 ? (
          <AmountContainer>
            <Amount bold testID={`${testID}-amount`}>
              {amount >= 100 ? "+99" : amount}
            </Amount>
          </AmountContainer>
        ) : null}
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
