import React from "react";
import { Pressable } from "react-native";
import {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Container, Indicator } from "./styles";

type Props = {
  defaultValue?: boolean;
  onToggle?: () => void;
};

const BUTTON_WIDTH = 50;
const INDICATOR_WIDTH = 25;

export const ToggleButton = ({ defaultValue, onToggle }: Props) => {
  const state = useSharedValue(defaultValue ? 1 : 0);
  const isAnimating = useSharedValue(false);

  const indicatorStyles = useAnimatedStyle(() => ({
    left: interpolate(
      state.value,
      [0, 1],
      [5, BUTTON_WIDTH - INDICATOR_WIDTH - 5]
    ),
  }));

  const toggle = () => {
    if (isAnimating.value) return;

    const newState = state.value ? 0 : 1;

    isAnimating.value = true;
    state.value = withSpring(newState, {}, () => (isAnimating.value = false));

    onToggle && onToggle();
  };

  return (
    <Pressable onPress={toggle}>
      <Container>
        <Indicator style={indicatorStyles} />
      </Container>
    </Pressable>
  );
};
