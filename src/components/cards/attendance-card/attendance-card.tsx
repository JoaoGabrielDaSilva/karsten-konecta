import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { AttendanceProductModel } from "../../../models/Attendance";
import { formatFullDate } from "../../../utils/date/format-full-date";
import { cpfMask } from "../../../utils/mask/cpf-mask";
import { Button } from "../../buttons/button/button";
import { ListProduct } from "../../list/list-product/list-product";
import { Container, Name, Label, Content, Value } from "./styles";

export type AttendanceCardProps = {
  name: string;
  cpfCnpj: string;
  createdAt: Date;
  totalProductsInCart: string;
  lastAddedProduct: AttendanceProductModel;
};

type Props = AttendanceCardProps & {
  style?: StyleProp<ViewStyle>;
  onButtonPress?: () => void;
};

export const AttendanceCard = ({
  name,
  cpfCnpj,
  createdAt = new Date(),
  totalProductsInCart,
  lastAddedProduct,
  onButtonPress,
  style,
}: Props) => {
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
          {formatFullDate({ date: createdAt })}
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
