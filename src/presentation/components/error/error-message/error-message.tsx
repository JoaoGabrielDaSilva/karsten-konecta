import React, { ReactNode } from "react";
import { StyleProp, TextStyle } from "react-native";
import { Text } from "./styles";

type Props = {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
};

export const ErrorMessage = ({ children, style }: Props) => (
  <Text style={style}>{children}</Text>
);
