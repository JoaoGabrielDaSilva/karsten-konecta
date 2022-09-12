import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { GetAttendanceList } from "../../../../domain/usecases/attendance/get-attendance-list";
import { formatFullDate } from "../../../utils/date/format-full-date";
import { cpfMask } from "../../../utils/mask/cpf-mask";
import { Button } from "../../buttons/button/button";
import { ListProduct } from "../../list/list-product/list-product";
import { Container, Name, Label, Content, Value } from "./styles";

export type AttendanceCardProps = GetAttendanceList.AttendanceList;

type Props = AttendanceCardProps & {
  style?: StyleProp<ViewStyle>;
  onButtonPress?: () => void;
};

export const AttendanceCard = ({
  name,
  cpfCnpj,
  createdAt,
  totalProductsInCart,
  lastAddedProduct,
  onButtonPress,
  style,
}: Props) => {
  console.log(createdAt);

  return (
    <Container style={style} justify="space-between" align="center">
      <Content>
        <Name variant="heading" bold>
          {name}
        </Name>
        <Value>
          <Label>CPF: </Label>
          {cpfMask(cpfCnpj)}
        </Value>
        <Value>
          <Label>Data de Criação: </Label>
          {createdAt}
        </Value>
        <Value>
          <Label>Itens no Carrinho: </Label>
          {totalProductsInCart}
        </Value>
        <Value>
          <Label>Último Produto Adicionado:</Label>
        </Value>

        <ListProduct {...lastAddedProduct} />
        <Button text="Continuar Atendimento" onPress={onButtonPress} />
      </Content>
    </Container>
  );
};
