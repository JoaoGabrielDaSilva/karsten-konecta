import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Container, Label, Value } from "./styles";

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const ShippingInfoLoader = ({ style }: Props) => {
  return (
    <Container style={style}>
      <Label width={50} height={15} />
      <Value width={250} height={10} />
    </Container>
  );
};
