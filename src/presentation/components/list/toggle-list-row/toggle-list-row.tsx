import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { ToggleButton } from "../../buttons/toggle-button/toggle-button";
import { Container, Label } from "./styles";

export type ToggleListRowProps = {
  label: string;
  background?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
  onToggle?: () => void;
};

export const ToggleListRow = ({
  label,
  color,
  onToggle,
  ...props
}: ToggleListRowProps) => {
  return (
    <Container justify="space-between" align="center" {...props}>
      <Label color={color}>{label}</Label>
      <ToggleButton defaultValue onToggle={onToggle} />
    </Container>
  );
};
