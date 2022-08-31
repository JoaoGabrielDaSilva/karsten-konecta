import React from "react";
import { Typography } from "../utils";

import { Container, HeaderIcon, HeaderLeft, HeaderRight } from "./styles";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import { BorderlessButton } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

type IconType = keyof typeof MaterialIcons.glyphMap;

type Props = DrawerHeaderProps & {
  headerLeftIcon?: IconType;
  rightIcon?: IconType;
};

export const Header = ({ options, navigation, headerLeftIcon }: Props) => {
  return (
    <Container align="center">
      <HeaderLeft>
        {headerLeftIcon && (
          <HeaderIcon
            name={headerLeftIcon}
            onPress={() => navigation.navigate("Search")}
          />
        )}
      </HeaderLeft>
      <Typography variant="heading" textAlign="center" bold>
        {options.title}
      </Typography>
      <HeaderRight>
        <BorderlessButton onPress={navigation.toggleDrawer}>
          <HeaderIcon name="menu" />
        </BorderlessButton>
      </HeaderRight>
    </Container>
  );
};
