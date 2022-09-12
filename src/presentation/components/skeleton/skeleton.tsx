import { useEffect } from "react";
import { StyleProp, ViewStyle } from "react-native";
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Container, Shimmer } from "./styles";

export type SkeletonVariant = "normal" | "dark";

type Props = {
  width: number;
  height: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  variant?: SkeletonVariant;
  children?: React.ReactNode;
};

const VARIANT_COLORS = {
  normal: ["#e1e1e1", "#f5f5f5bc"],
  dark: ["#bcbcbc", "#bcbcbcbc"],
};

export const Skeleton = ({ variant = "normal", children, ...props }: Props) => {
  const transition = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        transition.value,
        [0, 1],
        VARIANT_COLORS[variant]
      ),
    };
  });

  useEffect(() => {
    transition.value = withRepeat(withTiming(0, { duration: 700 }), -1, true);
  }, []);

  return (
    <Container {...props}>
      <Shimmer {...props} style={animatedStyles}>
        {children}
      </Shimmer>
    </Container>
  );
};
