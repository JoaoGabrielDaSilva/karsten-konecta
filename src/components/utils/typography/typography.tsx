import React from "react";
import { TextProps } from "react-native";

import { Text } from "./styles";

export type TypographyVariant = "heading" | "paragraph" | "text" | "subtitle";

export type TextAlign = "auto" | "left" | "right" | "center" | "justify";

type Props = TextProps & {
  children?: React.ReactNode;
  variant?: TypographyVariant;
  textAlign?: TextAlign;
  bold?: boolean;
  semibold?: boolean;
};

const textAlignDictionary: { [key: string]: TextAlign } = {
  heading: "auto",
  paragraph: "justify",
  text: "auto",
};

export const Typography = ({
  children,
  variant = "text",
  textAlign = textAlignDictionary.text,
  ...props
}: Props) => {
  return (
    <Text {...props} variant={variant} textAlign={textAlign}>
      {children}
    </Text>
  );
};
