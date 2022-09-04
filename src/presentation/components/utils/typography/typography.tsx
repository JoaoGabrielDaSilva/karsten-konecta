import React from "react";
import { TextProps } from "react-native";
import Animated from "react-native-reanimated";

import { Text } from "./styles";

export type TypographyVariant = "heading" | "paragraph" | "text" | "subtitle";

export type TextAlign = "auto" | "left" | "right" | "center" | "justify";

export type TypographyProps = TextProps & {
  children?: React.ReactNode;
  variant?: TypographyVariant;
  textAlign?: TextAlign;
  bold?: boolean;
  semibold?: boolean;
};

const AnimatedText = Animated.createAnimatedComponent(Text);

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
}: TypographyProps) => {
  return (
    <AnimatedText variant={variant} textAlign={textAlign} {...props}>
      {children}
    </AnimatedText>
  );
};
