import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { AttendanceProductModel } from "../../../models/Attendance";
import { useAttendanceStore } from "../../../store/attendance";
import { AmountButton } from "../../buttons/amount-button/amount-button";
import { Row, Typography } from "../../utils";
import {
  Container,
  Left,
  Right,
  Image,
  ImageWrapper,
  Name,
  Label,
  Code,
  Ean,
  Col,
  Content,
  Bottom,
  DeleteIcon,
  DeleteText,
} from "./styles";

type Props = AttendanceProductModel & {
  borderless?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const AttendanceListProduct = ({
  name,
  code,
  ean,
  amount,
  uri,
  borderless,
  style,
}: Props) => {
  const { increaseProductAmount, decreaseProductAmount } = useAttendanceStore();

  return (
    <Container style={style}>
      <Content borderless={borderless}>
        <Row>
          <Left>
            <ImageWrapper>
              <Image source={{ uri }} resizeMode="contain" />
            </ImageWrapper>
          </Left>
          <Right>
            <Name>{name}</Name>

            <Row justify="space-between">
              <Col>
                <Code>
                  <Label>Código: </Label>
                  {code}
                </Code>
                <Ean>
                  <Label>EAN: </Label>
                  {ean}
                </Ean>
              </Col>
            </Row>
          </Right>
        </Row>
        <Bottom align="center" justify="space-between">
          <AmountButton
            amount={amount}
            maxAmount={10}
            onDecrease={() => decreaseProductAmount({ code })}
            onIncrease={() => increaseProductAmount({ code })}
          />
          <Row align="center">
            <DeleteIcon name="trash-can-outline" />
            <DeleteText>Excluir item</DeleteText>
          </Row>
        </Bottom>
      </Content>
    </Container>
  );
};
