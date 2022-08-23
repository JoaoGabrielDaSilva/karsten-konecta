import React from "react";
import { Typography } from "../utils";

import { Container, HeaderIcon, HeaderLeft, HeaderRight } from "./styles";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import { BorderlessButton } from "react-native-gesture-handler";

type Props = DrawerHeaderProps;

export const Header = ({ options, navigation }: Props) => {
  return (
    <Container align="center">
      <HeaderLeft>
        <BorderlessButton onPress={navigation.toggleDrawer}>
          <HeaderIcon name="menu" />
        </BorderlessButton>
      </HeaderLeft>
      <Typography variant="heading" textAlign="center" bold>
        {options.title}
      </Typography>
      <HeaderRight>
        <HeaderIcon name="search" />
      </HeaderRight>
    </Container>
  );
};
