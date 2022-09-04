import React from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { formatFullDate } from "../../../utils/date/format-full-date";
import { ListRow } from "../../list/list-row/list-row";
import { Row } from "../../utils";

import {
  Container,
  Name,
  Label,
  Content,
  Value,
  BorderContainer,
  CopyIcon,
  Headline,
} from "./styles";

export type OrderCardProps = {
  orderNumber: string;
  status: string;
  customerName: string;
  createdAt: Date;
  totalProductsIn: number;
};

type Props = OrderCardProps & {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export const OrderCard = ({
  orderNumber,

  status,
  customerName,
  createdAt,
  totalProductsIn,
  onPress,
  style,
}: Props) => {
  const theme = useTheme();

  return (
    <Container style={style} justify="space-between" align="center">
      <Headline justify="space-between" align="center">
        <Name variant="heading" bold>
          {orderNumber}
        </Name>
        <BorderlessButton
          hitSlop={{
            vertical: theme.spacing.lg,
            horizontal: theme.spacing.lg,
          }}
        >
          <CopyIcon name="content-copy" />
        </BorderlessButton>
      </Headline>
      <Pressable onPress={onPress}>
        <Content>
          <BorderContainer>
            <Value>
              <Label>Status: </Label>
              {status}
            </Value>
            <Value>
              <Label>Cliente: </Label>
              {customerName}
            </Value>
            <Value>
              <Label>Data de crianção: </Label>
              {formatFullDate({ date: createdAt })}
            </Value>
            <Value>
              <Label>Quantidade de itens: </Label>
              {totalProductsIn}
            </Value>
          </BorderContainer>
        </Content>
      </Pressable>

      <ListRow
        label="Resumo do pedido"
        rightIconFamily="feather"
        rightIcon="chevron-right"
        borderless
        onPress={onPress}
      />
    </Container>
  );
};
