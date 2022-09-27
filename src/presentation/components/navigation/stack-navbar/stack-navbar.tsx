import React from "react";

import { Container, HeaderIcon, HeaderLeft, HeaderRight } from "./styles";
import { BorderlessButton } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackHeaderProps } from "@react-navigation/stack";
import { Typography } from "../../utils";
import { DrawerActions } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

type IconType = keyof typeof MaterialCommunityIcons.glyphMap;

type Props = StackHeaderProps & {
  headerLeftIcon?: IconType;
  rightIcon?: IconType;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
  backArrow?: boolean;
  drawer?: boolean;
  rightIconsDisabled?: boolean;
};

export const StackNavbar = ({
  options,
  navigation,
  onRightIconPress,
  rightIcon,
  onLeftIconPress,
  headerLeftIcon,
  backArrow = true,
  drawer,
  rightIconsDisabled,
}: Props) => {
  const { canGoBack, goBack, dispatch } = navigation;

  const openDrawer = () => {
    const action = DrawerActions.openDrawer();

    dispatch(action);
  };

  return (
    <Container align="center">
      <HeaderLeft>
        {((canGoBack() && backArrow) || headerLeftIcon) && (
          <TouchableOpacity onPress={onLeftIconPress || goBack}>
            <HeaderIcon name={headerLeftIcon || "chevron-left"} />
          </TouchableOpacity>
        )}
      </HeaderLeft>
      <Typography variant="heading" textAlign="center" bold>
        {options.title}
      </Typography>
      <HeaderRight>
        {rightIcon && (
          <TouchableOpacity
            disabled={rightIconsDisabled}
            onPress={() => onRightIconPress && onRightIconPress()}
          >
            <HeaderIcon name={rightIcon} disabled={rightIconsDisabled} />
          </TouchableOpacity>
        )}
        {drawer && (
          <BorderlessButton onPress={openDrawer}>
            <HeaderIcon name="menu" />
          </BorderlessButton>
        )}
      </HeaderRight>
    </Container>
  );
};
