import React from "react";
import Animated from "react-native-reanimated";
import { Text, ITextProps } from "native-base";

export type TypographyProps = ITextProps & {
  semibold?: boolean;
};

const AnimatedText = Animated.createAnimatedComponent(Text);

export const Typography = ({ semibold, ...props }: TypographyProps) => {
  return (
    <AnimatedText fontWeight={semibold ? "semibold" : "normal"} {...props} />
  );
};
