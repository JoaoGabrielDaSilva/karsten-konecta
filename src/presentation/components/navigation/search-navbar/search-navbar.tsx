import React from "react";

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

type IconType = keyof typeof MaterialCommunityIcons.glyphMap;

type Props = StackHeaderProps & {
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
}: Props) => {
  const { canGoBack, goBack, dispatch, push } = navigation;

  const openDrawer = () => {
    const action = DrawerActions.openDrawer();

    dispatch(action);
  };

  return (
    <Container align="center">
      <HeaderLeft>
        {((canGoBack() && backArrow) || headerLeftIcon) && (
          <LeftIcon
            name={headerLeftIcon || "chevron-left"}
            onPress={onLeftIconPress || goBack}
          />
        )}
        <Center>
          <StyledTextInput
            size="small"
            control={control}
            name="search"
            onFocus={onFocus}
            disableFloatingPlaceholder
            placeholder="Buscar produtos..."
            onEndEditing={handleSubmit}
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
          <BorderlessButton onPress={openDrawer}>
            <DrawerIcon name="menu" />
          </BorderlessButton>
        )}
      </HeaderRight>
    </Container>
  );
};
