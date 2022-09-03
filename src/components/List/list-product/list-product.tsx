import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { AttendanceProductModel } from "../../../models/Attendance";

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

type Props = AttendanceProductModel & {
  borderless?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const ListProduct = ({
  name,
  code,
  ean,
  uri,
  borderless,
  amount,
  style,
}: Props) => {
  return (
    <Container borderless={borderless} style={style}>
      <Left>
        <ImageWrapper>
          <Image source={{ uri }} resizeMode="contain" />
        </ImageWrapper>
        {amount ? (
          <AmountContainer>
            <Amount bold>{amount >= 100 ? "+99" : amount}</Amount>
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
