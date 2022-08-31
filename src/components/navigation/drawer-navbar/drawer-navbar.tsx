import React from "react";

import { Container, HeaderIcon, HeaderLeft, HeaderRight } from "./styles";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import { BorderlessButton } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Typography } from "../../utils";

type IconType = keyof typeof MaterialIcons.glyphMap;

type Props = DrawerHeaderProps & {
  headerLeftIcon?: IconType;
  rightIcon?: IconType;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
};

export const DrawerNavbar = ({
  options,
  navigation,
  onRightIconPress,
  rightIcon,
  onLeftIconPress,
  headerLeftIcon,
}: Props) => {
  const { canGoBack, goBack } = useNavigation();

  return (
    <Container align="center">
      <HeaderLeft>
        {(canGoBack() || headerLeftIcon) && (
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
        <BorderlessButton onPress={navigation.toggleDrawer}>
          <HeaderIcon name="menu" />
        </BorderlessButton>
      </HeaderRight>
    </Container>
  );
};
