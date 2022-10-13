import React from "react";
import { StyleProp, TextStyle } from "react-native";
import { Typography, TypographyProps } from "../typography/typography";

export type SectionTitleProps = Omit<
  TypographyProps,
  "bold" | "semibold" | "variant"
> & {
  style?: StyleProp<TextStyle>;
  testID?: string;
};

export const SectionTitle = ({ children, ...props }: SectionTitleProps) => {
  return (
    <Typography bold variant="heading" {...props}>
      {children}
    </Typography>
  );
};
