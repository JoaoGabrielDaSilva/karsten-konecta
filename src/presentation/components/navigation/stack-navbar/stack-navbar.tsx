import React from "react";

import { Container, HeaderIcon, HeaderLeft, HeaderRight } from "./styles";
import { BorderlessButton } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackHeaderProps } from "@react-navigation/stack";
import { Typography } from "../../utils";
import { DrawerActions } from "@react-navigation/native";

type IconType = keyof typeof MaterialCommunityIconsIcons.glyphMap;

type Props = StackHeaderProps & {
  headerLeftIcon?: IconType;
  rightIcon?: IconType;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
  backArrow?: boolean;
  drawer?: boolean;
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
          <HeaderIcon
            name={headerLeftIcon || "chevron-left"}
            onPress={onLeftIconPress || goBack}
          />
        )}
      </HeaderLeft>
      <Typography variant="heading" textAlign="center" bold>
        {options.title}
      </Typography>
      <HeaderRight>
        {rightIcon && (
          <BorderlessButton
            onPress={() => onRightIconPress && onRightIconPress()}
          >
            <HeaderIcon name={rightIcon} />
          </BorderlessButton>
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
