import React, { useEffect, useState } from "react";
import {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  ActivityIndicator,
  Modal as RNModal,
  TouchableOpacity,
} from "react-native";
import {
  ButtonContainer,
  Container,
  Overlay,
  StyledSectionTitle,
  Text,
  TopSide,
} from "./styles";
import { Button } from "../buttons/button/button";
import { useTheme } from "styled-components/native";

export type ModalProps = {
  title?: string;
  text?: string;
  visible?: boolean;
  onPressOverlay?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  ok?: () => void;
  confirm?: () => void;
  cancel?: () => void;
  testID?: string;
  loading?: boolean;
};

const ANIMATION_DURATION = 250;

export const Modal = ({
  visible,
  onPressOverlay,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  confirm,
  cancel,
  title,
  text,
  loading,
  ok,
  testID,
}: ModalProps) => {
  const theme = useTheme();
  const transition = useSharedValue(0);

  const [isVisible, setIsVisible] = useState(visible);

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: transition.value,
    transform: [{ scale: transition.value }],
  }));

  const closeModalMiddleware = (fn?: () => void) => {
    fn && fn();
    setTimeout(() => {
      setIsVisible(false);
    }, ANIMATION_DURATION);
    transition.value = withTiming(0, { duration: ANIMATION_DURATION });
  };

  useEffect(() => {
    if (!visible) return closeModalMiddleware();
    setIsVisible(true);
    transition.value = withTiming(1, { duration: ANIMATION_DURATION });
  }, [visible]);

  return (
    <RNModal
      testID={testID}
      visible={isVisible}
      transparent
      onRequestClose={() => closeModalMiddleware(onPressOverlay)}
      animationType="fade"
    >
      <Overlay
        testID={`${testID}-overlay`}
        onPress={() => closeModalMiddleware(onPressOverlay)}
        activeOpacity={1}
      >
        <TouchableOpacity onPress={() => {}} activeOpacity={1}>
          <Container style={animatedStyles}>
            <TopSide>
              <StyledSectionTitle>{title}</StyledSectionTitle>
              <Text>{text}</Text>
              {loading && (
                <ActivityIndicator
                  color={theme.color.text.primary}
                  style={{
                    margin: 30,
                  }}
                  size="large"
                />
              )}
            </TopSide>
            {(ok || cancel || confirm) && (
              <ButtonContainer
                align="center"
                justify={ok ? "center" : "space-between"}
              >
                {ok && (
                  <Button
                    text="OK"
                    onPress={() => closeModalMiddleware(ok)}
                    containerStyle={{ flex: 1 }}
                  />
                )}
                {cancel && (
                  <Button
                    text={cancelLabel}
                    containerStyle={{ marginRight: theme.spacing.lg, flex: 1 }}
                    buttonStyle={{
                      backgroundColor: "#eef1f7",
                    }}
                    textStyle={{
                      color: "#7f8286",
                    }}
                    onPress={() => closeModalMiddleware(cancel)}
                  />
                )}
                {confirm && (
                  <Button
                    text={confirmLabel}
                    onPress={() => closeModalMiddleware(confirm)}
                    containerStyle={{ flex: 1 }}
                  />
                )}
              </ButtonContainer>
            )}
          </Container>
        </TouchableOpacity>
      </Overlay>
    </RNModal>
  );
};
