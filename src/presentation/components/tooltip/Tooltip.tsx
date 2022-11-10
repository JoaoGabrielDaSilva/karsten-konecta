import React, { ReactElement, useState } from "react";
import {
  Modal,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import Animated, {
  interpolate,
  measure,
  runOnJS,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Content } from "./styles";

type Placement = "top" | "bottom";

type AnimationType = "expand";

export type TooltipProps = {
  children: ReactElement;
  content: ReactElement;
  backgroundColor?: string;
  placement?: Placement;
  animation?: AnimationType;
};

const PLACEMENT_OFFSETS = {
  bottom: 30,
  top: -50,
};

const { width: screenWidth } = Dimensions.get("window");

export const ToolTip = ({
  children,
  content,
  backgroundColor = "rgba(0,0,0,0.5)",
  placement = "top",
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const transition = useSharedValue(0);
  const positions = useSharedValue(null);

  const childrenRef = useAnimatedRef<Animated.View>();

  const closeTooltip = () => {
    transition.value = withTiming(0, { duration: 100 }, () =>
      runOnJS(setVisible)(false)
    );
  };

  const openTooltip = () => {
    runOnUI(measurePositions)();
    setVisible(true);
    transition.value = withTiming(1, { duration: 200 });
  };

  const measurePositions = () => {
    "worklet";
    try {
      const { pageX, pageY, width, height } = measure(childrenRef);

      console.log(pageX, pageY);

      const horizontalAdjustment =
        pageX + width > screenWidth - width ? width + 20 : 0;

      positions.value = {
        xWithHorizontalAdjustment: pageX - horizontalAdjustment,
        x: pageX,
        y: pageY,
      };

      console.log(positions.value);
    } catch (error) {
      console.log(error);
    }
  };

  const childrenStyles = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: positions.value?.y,
      left: positions.value?.x,
    };
  });
  const contentStyles = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: positions.value?.y + PLACEMENT_OFFSETS[placement],
      left: positions.value?.xWithHorizontalAdjustment,
      opacity: interpolate(transition.value, [0, 1], [0, 1]),
    };
  });

  return (
    <>
      <Animated.View ref={childrenRef}>
        <TouchableOpacity activeOpacity={0.7} onPress={openTooltip}>
          {children}
        </TouchableOpacity>
      </Animated.View>
      <Modal transparent visible={visible}>
        <View style={[StyleSheet.absoluteFillObject, { backgroundColor }]}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              flex: 1,
            }}
            onPress={closeTooltip}
          >
            <Animated.View style={childrenStyles}>{children}</Animated.View>
            <TouchableOpacity activeOpacity={1}>
              <Content style={contentStyles}>
                <>{content}</>
              </Content>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};
