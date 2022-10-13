import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { ShippingModel } from "../../models/Shipping";
import { Container, Label, Value } from "./styles";

export type ShippingInfoProps = ShippingModel & {
  days: number;
  style?: StyleProp<ViewStyle>;
};

export const ShippingInfo = ({ days, style }: ShippingInfoProps) => {
  return (
    <Container style={style}>
      <Label>Padrão</Label>
      <Value>
        Em até {days} {days > 1 ? "dias úteis" : "dia útil"} - Grátis
      </Value>
    </Container>
  );
};
