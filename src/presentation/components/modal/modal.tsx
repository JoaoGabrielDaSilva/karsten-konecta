import React, { useState } from "react";
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
  closeModal?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  ok?: () => void;
  confirm?: () => void;
  cancel?: () => void;
};

export const Modal = ({
  visible,
  closeModal,
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
  const isFirstRun = useSharedValue(true);

  const [isVisible, setIsVisible] = useState(visible);

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: transition.value,
    transform: [{ scale: transition.value }],
  }));

  const onClose = (fn: () => void) => {
    fn && fn();
    setIsVisible(false);
  };

  const handleConfirm = () => {
    confirm();
  };

  useAnimatedReaction(
    () => (visible ? 1 : 0),
    (value) => {
      if (visible) {
        runOnJS(setIsVisible)(true);
      }

      transition.value = withTiming(value, {}, () =>
        !value && !isFirstRun
          ? runOnJS(onClose)(cancel)
          : (isFirstRun.value = false)
      );
    },
    [visible]
  );

  const handleCloseModal = (fn: () => void) => {
    transition.value = withTiming(0, {}, () => runOnJS(onClose)(fn));
  };

  return (
    <RNModal visible={isVisible} transparent onRequestClose={closeModal}>
      <Overlay onPress={closeModal} activeOpacity={1}>
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
                  onPress={() => handleCloseModal(ok)}
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
                    onPress={() => handleCloseModal(cancel)}
                  />
                  <Button
                    text={confirmLabel}
                    onPress={() => handleCloseModal(confirm)}
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
