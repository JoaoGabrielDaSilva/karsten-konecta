import React from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { GetOrderList } from "../../../../domain/usecases/attendance/get-order-list";
import { formatFullDate } from "../../../utils/date/format-full-date";
import { ListRow } from "../../list/list-row/list-row";

import {
  Container,
  Name,
  Label,
  Content,
  Value,
  BorderContainer,
  CopyIcon,
  Headline,
  StyledListRow,
} from "./styles";

export type OrderCardProps = GetOrderList.OrderListItem;

type Props = OrderCardProps & {
  style?: StyleProp<ViewStyle>;
  onPress?: (orderId: string) => void;
};

export const OrderCard = ({
  attendanceId,
  orderCode,
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
          {orderCode}
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
      <Pressable onPress={() => onPress(attendanceId)}>
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
              <Label>Data de criação: </Label>
              {createdAt}
            </Value>
            <Value>
              <Label>Quantidade de itens: </Label>
              {totalProductsIn}
            </Value>
          </BorderContainer>
        </Content>
      </Pressable>

      <StyledListRow
        label="Resumo do pedido"
        rightIconFamily="feather"
        rightIcon="chevron-right"
        borderless
        onPress={() => onPress(attendanceId)}
      />
    </Container>
  );
};
