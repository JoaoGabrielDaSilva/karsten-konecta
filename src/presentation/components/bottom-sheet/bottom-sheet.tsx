import React, { ReactNode, useEffect } from "react";
import { Dimensions, Modal, StyleSheet } from "react-native";
import {
  PanGestureHandler,
  gestureHandlerRootHOC,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { PanGesture } from "react-native-gesture-handler/lib/typescript/handlers/gestures/panGesture";
import Animated, {
  measure,
  runOnJS,
  runOnUI,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "styled-components/native";
import { Container, Grip, GripContainer, Overlay } from "./styles";

type Props = {
  visible: boolean;
  children: ReactNode;
};

const { height: screenHeight } = Dimensions.get("window");

export const BottomSheetContent = gestureHandlerRootHOC(
  ({ children }: Props) => {
    const theme = useTheme();

    const height = useSharedValue(0);
    const contentRef = useAnimatedRef();

    const gestureHandler = useAnimatedGestureHandler<
      PanGestureHandlerGestureEvent,
      { value: number }
    >({
      onStart: (_, ctx) => (ctx.value = height.value),
      onActive: (e, { value }) => {
        const translationY = value + -e.translationY;
        height.value = translationY;
      },
      onFinish: () => {
        const shouldExpand = height.value > screenHeight * 0.7;
        const shouldClose = height.value < screenHeight * 0.3;

        if (!shouldClose && !shouldExpand) {
          return (height.value = withTiming(screenHeight * 0.5));
        }

        if (shouldClose) {
          return (height.value = withTiming(0, {}, () =>
            runOnJS(() => console.log(123))
          ));
        }
        if (shouldExpand) {
          return (height.value = withTiming(screenHeight * 0.9));
        }
      },
    });

    const containerStyles = useAnimatedStyle(() => ({
      height: height.value,
    }));

    useEffect(() => {
      height.value = withTiming(screenHeight * 0.5);
    }, []);

    return (
      <Overlay>
        <Container style={containerStyles}>
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <GripContainer>
              <Grip />
            </GripContainer>
          </PanGestureHandler>
          <Animated.View
            ref={contentRef}
            style={{ flex: 1, paddingBottom: theme.spacing.lg }}
          >
            {children}
          </Animated.View>
        </Container>
      </Overlay>
    );
  }
);

export const BottomSheet = ({ children }: Props) => {
  return (
    <Modal transparent animationType="fade" visible={true}>
      <BottomSheetContent>{children}</BottomSheetContent>
    </Modal>
  );
};
