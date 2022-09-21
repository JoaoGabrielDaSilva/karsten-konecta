import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { CustomerAddressModel } from "../../../domain/models/address";
import { RadioButton } from "../buttons/radio-button/radio-button";
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

type Props = CustomerAddressModel & {
  style?: StyleProp<ViewStyle>;
  borderless?: boolean;
  showRightArrow?: boolean;
  editable?: boolean;
  selectable?: boolean;
  selected?: boolean;
  showMainLabel?: boolean;
  disabled?: boolean;
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
  isMain,
  editable,
  selectable,
  selected,
  showMainLabel = true,
  disabled,
}: Props) => {
  return (
    <Container
      style={style}
      justify="space-between"
      align={editable ? "flex-start" : "center"}
      borderless={borderless}
    >
      <Content disabled={disabled}>
        {isMain && showMainLabel ? (
          <Title variant="heading" bold>
            Principal{" "}
          </Title>
        ) : null}
        <Name bold variant="subtitle">
          {name}
        </Name>
        <Value>
          {street}, {number}
        </Value>
        {complement ? <Value>{complement}</Value> : null}
        <Value>
          {district} - {city}/{state}
        </Value>
        <Value>
          <Label>CEP: </Label>
          {cep}
        </Value>
        {reference ? (
          <Value>
            <Label>Referência: </Label>
            {reference}
          </Value>
        ) : null}
      </Content>
      {showRightArrow && !editable && !selectable && (
        <ArrowIcon name="chevron-right" disabled={disabled} />
      )}
      {editable ? <EditLabel disabled={disabled}>Alterar</EditLabel> : null}
      {selectable ? (
        <RadioButton active={selected} disabled={disabled} />
      ) : null}
    </Container>
  );
};
