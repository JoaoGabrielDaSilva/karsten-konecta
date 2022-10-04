import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { Container, Text, Icon } from "./styles";

export type AlertTypes = "error" | "warning" | "info" | "success";

export type AlertProps = {
  type: AlertTypes;
  children: string;
  testID?: string;
};

export const ALERT_ICONS: { [key: string]: keyof typeof Ionicons.glyphMap } = {
  error: "alert-circle-outline",
  warning: "warning-outline",
  info: "ios-information-circle-outline",
  success: "checkmark-circle-outline",
};

export const Alert = ({ children, type, testID }: AlertProps) => {
  return (
    <Container type={type} testID={testID}>
      <Icon type={type} name={ALERT_ICONS?.[type]} />
      <Text type={type}>{children}</Text>
    </Container>
  );
};
