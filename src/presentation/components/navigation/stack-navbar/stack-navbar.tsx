import React, { ReactNode } from "react";

import { Container, HeaderIcon, HeaderLeft, HeaderRight } from "./styles";
import { BorderlessButton } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackHeaderProps } from "@react-navigation/stack";
import { Typography } from "../../utils";
import { DrawerActions } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

type IconType = keyof typeof MaterialCommunityIcons.glyphMap;

export type StackNavbarProps = Pick<
  StackHeaderProps,
  "navigation" | "options"
> & {
  headerLeftIcon?: IconType;
  rightIcon?: IconType;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
  backArrow?: boolean;
  drawer?: boolean;
  rightIconsDisabled?: boolean;
  renderHeaderRight?: () => ReactNode | ReactNode[];
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
  renderHeaderRight,
}: StackNavbarProps) => {
  const { canGoBack, goBack, dispatch } = navigation;

  return (
    <Container align="center">
      <HeaderLeft>
        {((canGoBack() && backArrow) || headerLeftIcon) && (
          <TouchableOpacity
            onPress={onLeftIconPress || goBack}
            hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
          >
            <HeaderIcon name={headerLeftIcon || "chevron-left"} />
          </TouchableOpacity>
        )}
      </HeaderLeft>
      <Typography variant="heading" textAlign="center" bold>
        {options.title}
      </Typography>
      <HeaderRight>
        {renderHeaderRight && renderHeaderRight()}
        {rightIcon && !renderHeaderRight && (
          <TouchableOpacity
            disabled={rightIconsDisabled}
            onPress={() => onRightIconPress && onRightIconPress()}
          >
            <HeaderIcon name={rightIcon} disabled={rightIconsDisabled} />
          </TouchableOpacity>
        )}
        {drawer && !renderHeaderRight && (
          <BorderlessButton onPress={() => dispatch(DrawerActions.openDrawer)}>
            <HeaderIcon name="menu" />
          </BorderlessButton>
        )}
      </HeaderRight>
    </Container>
  );
};
