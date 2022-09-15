import React from "react";
import { Dimensions, StyleProp, ViewStyle } from "react-native";
import {
  Container,
  Name,
  CorporateName,
  Cnpj,
  Content,
  RadioButton,
} from "./styles";

type Props = {
  style?: StyleProp<ViewStyle>;
  selected?: boolean;
};

const { width } = Dimensions.get("window");

export const StoreCardLoader = ({ selected, style }: Props) => {
  return (
    <Container style={style} justify="space-between" align="center">
      <Content>
        <Name width={width * 0.4} height={17} />
        <CorporateName width={width * 0.25} height={13} />
        <Cnpj width={width * 0.35} height={13} />
      </Content>
      <RadioButton width={25} height={25} borderRadius={25} />
    </Container>
  );
};
