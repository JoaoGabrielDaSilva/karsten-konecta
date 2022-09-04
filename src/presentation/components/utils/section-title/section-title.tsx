import React from "react";
import { StyleProp, TextStyle } from "react-native";
import { Typography, TypographyProps } from "../typography/typography";

type Props = Omit<TypographyProps, "bold" | "semibold" | "variant"> & {
  style?: StyleProp<TextStyle>;
};

export const SectionTitle = ({ children, ...props }: Props) => {
  return (
    <Typography bold variant="heading" {...props}>
      {children}
    </Typography>
  );
};
