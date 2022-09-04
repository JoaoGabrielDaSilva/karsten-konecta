import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Address as AddressModel } from "../../models/Address";
import {
  Container,
  Title,
  Name,
  Label,
  Value,
  Content,
  ArrowIcon,
  EditLabel,
} from "./styles";

type Props = AddressModel & {
  style?: StyleProp<ViewStyle>;
  borderless?: boolean;
  showRightArrow?: boolean;
  editable?: boolean;
};

export const Address = ({
  name,
  street,
  number,
  district,
  city,
  state,
  cep,
  style,
  complement,
  reference,
  borderless,
  showRightArrow = true,
  editable,
}: Props) => {
  return (
    <Container
      style={style}
      justify="space-between"
      align={editable ? "flex-start" : "center"}
      borderless={borderless}
    >
      <Content>
        <Title variant="heading" bold>
          Endereço
        </Title>
        <Name bold variant="subtitle">
          {name}
        </Name>
        <Value>
          {street}, {number}
        </Value>
        <Value>{complement}</Value>
        <Value>
          {district} - {city}/{state}
        </Value>
        <Value>
          <Label>CEP: </Label>
          {cep}
        </Value>
        <Value>
          <Label>Referência: </Label>
          {reference}
        </Value>
      </Content>
      {showRightArrow && !editable && <ArrowIcon name="chevron-right" />}
      {editable ? <EditLabel>Alterar</EditLabel> : null}
    </Container>
  );
};
