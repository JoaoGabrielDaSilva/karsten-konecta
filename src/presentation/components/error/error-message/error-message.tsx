import React, { ReactNode } from "react";
import { StyleProp, TextStyle } from "react-native";
import { Text } from "./styles";

export type ErrorMessageProps = {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
};

export const ErrorMessage = ({ children, style }: ErrorMessageProps) => (
  <Text style={style}>{children}</Text>
);
