import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Container, Icon, Label, RightSide, Value } from "./styles";

export type ListRowProps = {
  label: string;
  value?: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  color?: string;
  background?: string;
  style?: StyleProp<ViewStyle>;
  borderless?: boolean;
};

export const ListRow = ({
  label,
  value,
  icon,
  color,

  ...props
}: ListRowProps) => {
  return (
    <Container justify="space-between" align="center" {...props}>
      {label ? <Label color={color}>{label}</Label> : null}
      <RightSide>
        {value ? <Value color={color}>{value}</Value> : null}
        {icon && <Icon name={icon} />}
      </RightSide>
    </Container>
  );
};
