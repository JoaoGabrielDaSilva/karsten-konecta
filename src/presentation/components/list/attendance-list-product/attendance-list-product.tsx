import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { useTheme } from "styled-components/native";
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

export type AttendanceListProductProps = AttendanceProductModel & {
  borderless?: boolean;
  style?: StyleProp<ViewStyle>;
  onUpdateAmount?: ({ id, sum }: { id: string; sum: boolean }) => void;
  onDelete?: ({ id }: { id: string }) => void;
  onPress?: () => void;
};

type ActionType = "update" | "delete" | null;

export const AttendanceListProduct = ({
  id,
  name,
  code,
  ean,
  amount = 0,
  uri,
  borderless,
  style,
  onPress,
  onUpdateAmount,
  onDelete,
}: AttendanceListProductProps) => {
  const theme = useTheme();

  const [loading, setLoading] = useState<ActionType>(null);

  const actionMiddleWare = async (
    fn: () => Promise<void>,
    type: ActionType
  ) => {
    if (!!loading) return;
    setLoading(type);
    await fn();
    setLoading(null);
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
            loading={loading === "update"}
            amount={amount}
            onDecrease={() =>
              actionMiddleWare(
                async () => onUpdateAmount({ id, sum: false }),
                "update"
              )
            }
            onIncrease={() =>
              actionMiddleWare(
                async () => onUpdateAmount({ id, sum: true }),
                "update"
              )
            }
          />
          <TouchableOpacity
            onPress={() =>
              actionMiddleWare(async () => onDelete({ id }), "delete")
            }
          >
            <Row align="center">
              {loading === "delete" && (
                <ActivityIndicator
                  color={theme.color.text.primary}
                  size="small"
                />
              )}
              <DeleteIcon name="trash-can-outline" />
              <DeleteText>Excluir item</DeleteText>
            </Row>
          </TouchableOpacity>
        </Bottom>
      </Content>
    </Container>
  );
};
