import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Pressable } from "react-native";
import { Container, Fill, Label, StyledRow } from "./styles";

export type Variant = "default" | "small";

export type RadioButtonProps = {
  active?: boolean;
  onPress?: () => void;
  variant?: Variant;
  label?: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

export const RadioButton = ({
  active,
  onPress,
  variant = "default",
  style,
  label,
  disabled,
}: RadioButtonProps) => {
  return (
    <Pressable onPress={onPress} style={style} disabled={disabled}>
      <StyledRow align="center" disabled={disabled}>
        <Container variant={variant}>
          {active && <Fill variant={variant} />}
        </Container>
        {label ? <Label>{label}</Label> : null}
      </StyledRow>
    </Pressable>
  );
};
