import React, { RefObject, useRef, useState } from "react";

import {
  Center,
  Container,
  DrawerIcon,
  HeaderLeft,
  HeaderRight,
  RightIcon,
  LeftIcon,
  StyledTextInput,
} from "./styles";
import { BorderlessButton } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackHeaderProps } from "@react-navigation/stack";
import { DrawerActions } from "@react-navigation/native";
import { Control } from "react-hook-form";
import { TextInputRef } from "../../form/text-input/text-input";

type IconType = keyof typeof MaterialCommunityIcons.glyphMap;

export type StackSearchNavbarProps = Pick<StackHeaderProps, "navigation"> & {
  headerLeftIcon?: IconType;
  rightIcon?: IconType;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
  backArrow?: boolean;
  drawer?: boolean;
  control: Control<{ search: string }, "search">;
  handleSubmit?: () => void;
  defaultFocus?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const StackSearchNavbar = ({
  navigation,
  onRightIconPress,
  rightIcon,
  onLeftIconPress,
  headerLeftIcon,
  backArrow = true,
  drawer,
  control,
  handleSubmit,
  defaultFocus,
  onFocus,
  onBlur,
}: StackSearchNavbarProps) => {
  const { canGoBack, goBack } = navigation;

  const inputRef = useRef<TextInputRef>();

  const [inputIsFocused, setInputIsFocused] = useState(defaultFocus);

  const handleBlur = () => {
    setInputIsFocused(false);
    onBlur && onBlur();
  };
  const handleFocus = () => {
    setInputIsFocused(true);
    onFocus && onFocus();
  };

  const handleBackArrowPress = () => {
    if (onLeftIconPress) return onLeftIconPress();

    if (inputIsFocused) return inputRef?.current?.blur();

    goBack();
  };

  return (
    <Container align="center">
      <HeaderLeft>
        {((canGoBack() && backArrow) || headerLeftIcon) && (
          <LeftIcon
            name={headerLeftIcon || "chevron-left"}
            onPress={handleBackArrowPress}
          />
        )}
        <Center>
          <StyledTextInput
            ref={inputRef}
            size="small"
            control={control}
            name="search"
            onFocus={handleFocus}
            onBlur={handleBlur}
            disableFloatingPlaceholder
            placeholder="Buscar produtos..."
            onSubmitEditing={handleSubmit}
            autoFocus={defaultFocus}
          />
        </Center>
      </HeaderLeft>
      <HeaderRight>
        {rightIcon && (
          <BorderlessButton
            onPress={() => onRightIconPress && onRightIconPress()}
          >
            <RightIcon name={rightIcon} />
          </BorderlessButton>
        )}
        {drawer && (
          <BorderlessButton onPress={DrawerActions.openDrawer}>
            <DrawerIcon name="menu" />
          </BorderlessButton>
        )}
      </HeaderRight>
    </Container>
  );
};
