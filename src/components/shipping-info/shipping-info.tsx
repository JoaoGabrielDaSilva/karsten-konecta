import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { ShippingModel } from "../../models/Shipping";
import { Container, Title, Label, Value } from "./styles";

type Props = ShippingModel & {
  days: number;
  style?: StyleProp<ViewStyle>;
};

export const ShippingInfo = ({ days, style }: Props) => {
  return (
    <Container style={style}>
      <Title variant="heading" bold>
        Entrega
      </Title>
      <Label>Padrão</Label>
      <Value>
        Em até {days} {days > 1 ? "dias úteis" : "dia útil"} - Grátis
      </Value>
    </Container>
  );
};
