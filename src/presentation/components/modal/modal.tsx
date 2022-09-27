import React, { useEffect, useState } from "react";
import {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Modal as RNModal, TouchableOpacity } from "react-native";
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

type Props = {
  title?: string;
  text?: string;
  visible?: boolean;
  onPressOverlay?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  ok?: () => void;
  confirm?: () => void;
  cancel?: () => void;
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

  ok,
}: Props) => {
  const theme = useTheme();
  const transition = useSharedValue(0);

  const [isVisible, setIsVisible] = useState(visible);

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: transition.value,
    transform: [{ scale: transition.value }],
  }));

  const handleClose = (fn: () => void) => {
    fn();
    setTimeout(() => {
      setIsVisible(false);
    }, ANIMATION_DURATION);
  };

  const closeModalMiddleware = (fn: () => void) => {
    handleClose(fn);
    transition.value = withTiming(0, { duration: ANIMATION_DURATION });
  };

  useEffect(() => {
    if (!visible) return;
    setIsVisible(true);
    transition.value = withTiming(1, { duration: ANIMATION_DURATION });
  }, [visible]);

  return (
    <RNModal
      visible={isVisible}
      transparent
      onRequestClose={() => closeModalMiddleware(onPressOverlay)}
      animationType="fade"
    >
      <Overlay
        onPress={() => closeModalMiddleware(onPressOverlay)}
        activeOpacity={1}
      >
        <TouchableOpacity onPress={() => {}} activeOpacity={1}>
          <Container style={animatedStyles}>
            <TopSide>
              <StyledSectionTitle>{title}</StyledSectionTitle>
              <Text>{text}</Text>
            </TopSide>
            <ButtonContainer
              align="center"
              justify={ok ? "center" : "space-between"}
            >
              {ok ? (
                <Button
                  text="OK"
                  onPress={() => closeModalMiddleware(ok)}
                  containerStyle={{ flex: 1 }}
                />
              ) : (
                <>
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
                  <Button
                    text={confirmLabel}
                    onPress={() => closeModalMiddleware(confirm)}
                    containerStyle={{ flex: 1 }}
                  />
                </>
              )}
            </ButtonContainer>
          </Container>
        </TouchableOpacity>
      </Overlay>
    </RNModal>
  );
};
