import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Container, Icon, Label } from "./styles";

export type ListRowProps = {
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  color?: string;
  background?: string;
  style?: StyleProp<ViewStyle>;
};

export const ListRow = ({ label, icon, color, ...props }: ListRowProps) => {
  return (
    <Container justify="space-between" align="center" {...props}>
      <Label color={color}>{label}</Label>
      <Icon name={icon} />
    </Container>
  );
};
