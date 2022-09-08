import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Pressable } from "react-native";
import { Row } from "../../utils";
import { Container, Fill, Label } from "./styles";

export type Variant = "default" | "small";

export type RadioButtonProps = {
  active?: boolean;
  onPress?: () => void;
  variant?: Variant;
  label?: string;
  style?: StyleProp<ViewStyle>;
};

export const RadioButton = ({
  active,
  onPress,
  variant,
  style,
  label,
}: RadioButtonProps) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <Row align="center">
        <Container variant={variant}>
          {active && <Fill variant={variant} />}
        </Container>
        {label ? <Label>{label}</Label> : null}
      </Row>
    </Pressable>
  );
};
