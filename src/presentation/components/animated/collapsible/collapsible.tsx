import React, { ReactNode, useEffect } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import Animated, {
  interpolate,
  measure,
  runOnUI,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Container, Wrapper } from "./styles";

type Props = {
  children: ReactNode;
  visible: boolean;
  style?: StyleProp<ViewStyle>;
};

export const Collapsible = ({ visible, children, style }: Props) => {
  const open = useSharedValue(false);
  const height = useSharedValue(0);
  const transition = useDerivedValue(() => {
    return open.value
      ? withTiming(1, { duration: 200 })
      : withTiming(0, { duration: 200 });
  });

  const containerRef = useAnimatedRef<Animated.View>();

  const measureContainer = () => {
    "worklet";
    try {
      height.value = measure(containerRef).height;
    } catch (error) {
      console.log(error);
    }
  };

  const animatedStyles = useAnimatedStyle(() => ({
    height: transition.value * height.value + 0.1,
    opacity: transition.value,
  }));

  useEffect(() => {
    if (!visible) {
      open.value = false;
      return;
    }

    open.value = true;
    runOnUI(measureContainer)();
  }, [visible]);

  return (
    <Container style={[style, animatedStyles]}>
      <Wrapper ref={containerRef}>{children}</Wrapper>
    </Container>
  );
};
