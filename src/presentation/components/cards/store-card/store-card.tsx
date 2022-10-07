import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { RadioButton } from "../../buttons/radio-button/radio-button";
import { Container, Name, CorporateName, Label, Cnpj, Content } from "./styles";

export type StoreCardProps = {
  name: string;
  corporateName: string;
  cnpj: string;
  style?: StyleProp<ViewStyle>;
  selected?: boolean;
};

export const StoreCard = ({
  name,
  corporateName,
  cnpj,
  selected = false,
  style,
}: StoreCardProps) => {
  return (
    <Container style={style} justify="space-between" align="center">
      <Content>
        <Name variant="heading" bold>
          {name}
        </Name>
        <CorporateName semibold>{corporateName}</CorporateName>
        <Cnpj>
          <Label>CNPJ: </Label>
          {cnpj}
        </Cnpj>
      </Content>
      <RadioButton active={selected} />
    </Container>
  );
};
