import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Container, Text, Icon } from "./styles";

export type AlertTypes = "error" | "warning" | "info" | "success";

type Props = {
  type: AlertTypes;
  children: string;
};

const TYPE_ICONS: { [key: string]: keyof typeof Ionicons.glyphMap } = {
  error: "alert-circle-outline",
  warning: "warning-outline",
  info: "ios-information-circle-outline",
  success: "checkmark-circle-outline",
};

export const Alert = ({ children, type }: Props) => {
  return (
    <Container type={type}>
      <Icon type={type} name={TYPE_ICONS?.[type]} />
      <Text type={type}>{children}</Text>
    </Container>
  );
};
