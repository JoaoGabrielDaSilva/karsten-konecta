import React, { useCallback, useEffect } from "react";
import {
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  measure,
  runOnUI,
  SharedValue,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { Container } from "./styles";

type ButtonComponentProps = {
  toggle: () => void;
  transitionValue: SharedValue<number>;
};

type Props = {
  children: React.ReactNode;
  visible: boolean;
};

export const Collapsible = ({ visible, children }: Props) => {
  const open = useSharedValue(false);
  const height = useSharedValue(0);
  const transition = useDerivedValue(() => {
    return open.value ? withSpring(1) : withSpring(0);
  });

  const containerRef = useAnimatedRef<Animated.View>();

  const measureElements = () => {
    "worklet";
    try {
      const layout = measure(containerRef);

      height.value = layout.height;
    } catch (error) {
      console.log(error);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      maxHeight: 1 + transition.value * height.value,
    };
  });

  useEffect(() => {
    if (!visible) {
      open.value = false;

      return;
    }
    runOnUI(measureElements)();
    open.value = true;
  }, [visible]);

  return (
    <Container>
      <Animated.View style={[animatedStyle, { overflow: "hidden" }]}>
        <Animated.View ref={containerRef}>{children}</Animated.View>
      </Animated.View>
    </Container>
  );
};
