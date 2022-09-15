import React, { useState } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { AttendanceProductModel } from "../../../../domain/models/product";
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
  Bottom,
  DeleteIcon,
  DeleteText,
  Pressable,
} from "./styles";

type Props = AttendanceProductModel & {
  borderless?: boolean;
  style?: StyleProp<ViewStyle>;
  onUpdateAmount?: ({ id, sum }: { id: string; sum: boolean }) => void;
  onPress?: () => void;
};

export const AttendanceListProduct = ({
  id,
  name,
  code,
  ean,
  amount,
  uri,
  borderless,
  style,
  onPress,
  onUpdateAmount,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const updateAmountMiddleware = async (fn: () => Promise<void>) => {
    if (loading) return;
    setLoading(true);
    await fn();
    setLoading(false);
  };

  return (
    <Container style={style}>
      <Content borderless={borderless}>
        <Pressable onPress={onPress}>
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
        </Pressable>
        <Bottom align="center" justify="space-between">
          <AmountButton
            loading={loading}
            amount={amount}
            onDecrease={() =>
              updateAmountMiddleware(async () =>
                onUpdateAmount({ id, sum: false })
              )
            }
            onIncrease={() =>
              updateAmountMiddleware(async () =>
                onUpdateAmount({ id, sum: true })
              )
            }
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
