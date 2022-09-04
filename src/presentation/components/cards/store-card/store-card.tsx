import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { RadioButton } from "../../buttons/radio-button/radio-button";
import { Container, Name, CorporateName, Label, Cnpj, Content } from "./styles";

export type StoreCardProps = {
  name: string;
  corporateName: string;
  cnpj: string;
};

type Props = StoreCardProps & {
  style?: StyleProp<ViewStyle>;
  selected?: boolean;
};

export const StoreCard = ({
  name,
  corporateName,
  cnpj,
  selected,
  style,
}: Props) => {
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
