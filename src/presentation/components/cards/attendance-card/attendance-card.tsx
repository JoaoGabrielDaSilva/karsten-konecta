import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { GetAttendanceList } from "../../../../domain/usecases/attendance/get-attendance-list";
import { cpfMask } from "../../../utils/mask/cpf-mask";
import { ListProduct } from "../../list/list-product/list-product";
import { Container, Name, Label, Content, Value, StyledButton } from "./styles";

export type AttendanceCardProps = GetAttendanceList.AttendanceList & {
  style?: StyleProp<ViewStyle>;
  onButtonPress?: () => void;
  testID?: string;
};

export const AttendanceCard = ({
  name,
  cpfCnpj,
  createdAt,
  totalProductsInCart,
  lastAddedProduct,
  onButtonPress,
  style,
  ...props
}: AttendanceCardProps) => {
  return (
    <Container style={style} justify="space-between" align="center" {...props}>
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

        {lastAddedProduct && <ListProduct {...lastAddedProduct} />}
        <StyledButton text="Continuar Atendimento" onPress={onButtonPress} />
      </Content>
    </Container>
  );
};
