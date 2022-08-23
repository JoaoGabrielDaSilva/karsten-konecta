import { DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { DrawerContentComponentProps } from "@react-navigation/drawer/lib/typescript/src/types";
import React from "react";
import { View } from "react-native";
import { useTheme } from "styled-components";

import { Container } from "./styles";

type Props = DrawerContentComponentProps;

export const Drawer = ({ ...props }: Props) => {
  const theme = useTheme();

  return (
    <Container
      contentContainerStyle={{
        flex: 1,
        justifyContent: "space-between",
        paddingVertical: theme.spacing.xl,
      }}
    >
      <View>
        <DrawerItemList {...props}></DrawerItemList>
      </View>
      <DrawerItem label={"Configuration"} onPress={() => {}} />
    </Container>
  );
};
