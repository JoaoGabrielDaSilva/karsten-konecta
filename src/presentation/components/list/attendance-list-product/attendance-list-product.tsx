import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { AttendanceProductModel } from "../../../models/Attendance";
import { useAttendanceStore } from "../../../store/attendance";
import { AmountButton } from "../../buttons/amount-button/amount-button";
import { Row } from "../../utils";
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
            <AmountButton
              style={{ alignSelf: "flex-end" }}
              amount={amount}
              maxAmount={10}
              onDecrease={() => decreaseProductAmount({ code })}
              onIncrease={() => increaseProductAmount({ code })}
            />
          </Row>
        </Right>
      </Content>
    </Container>
  );
};
