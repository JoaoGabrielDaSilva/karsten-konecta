import React from "react";
import { StyleProp, ViewStyle, Pressable } from "react-native";
import { GetAttendanceList } from "../../../../domain/usecases/attendance/get-attendance-list";
import { cpfMask } from "../../../utils/mask/cpf-mask";
import { RadioButton } from "../../buttons/radio-button/radio-button";
import { ListProduct } from "../../list/list-product/list-product";
import {
  Container,
  Name,
  Label,
  Content,
  Value,
  StyledListProduct,
} from "./styles";

export type AttendanceSelectCardProps = GetAttendanceList.AttendanceList;

type Props = AttendanceSelectCardProps & {
  style?: StyleProp<ViewStyle>;
  onPress?: (params: { attendanceId: string }) => void;
  selected?: boolean;
};

export const AttendanceSelectCard = ({
  id,
  name,
  cpfCnpj,
  createdAt,
  totalProductsInCart,
  lastAddedProduct,
  onPress,
  selected,
  style,
}: Props) => {
  console.log(createdAt);

  return (
    <Pressable onPress={() => onPress({ attendanceId: id })}>
      <Container style={style} justify="space-between">
        <Content>
          <Name variant="heading" bold>
            {name}
          </Name>
          {cpfCnpj ? (
            <Value>
              <Label>CPF: </Label>
              {cpfMask(cpfCnpj)}
            </Value>
          ) : null}
          <Value>
            <Label>Data de Criação: </Label>
            {createdAt}
          </Value>
          <Value>
            <Label>Itens no Carrinho: </Label>
            {totalProductsInCart}
          </Value>
          {lastAddedProduct && (
            <Value>
              <Label>Último Produto Adicionado:</Label>
            </Value>
          )}

          {lastAddedProduct && (
            <StyledListProduct borderless {...lastAddedProduct} />
          )}
        </Content>
        <RadioButton active={selected} />
      </Container>
    </Pressable>
  );
};