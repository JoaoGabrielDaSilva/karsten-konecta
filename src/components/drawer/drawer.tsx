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
      bounces={false}
      contentContainerStyle={{
        flex: 1,
        justifyContent: "space-between",
        paddingVertical: theme.spacing.xl,
        backgroundColor: theme.color.background.primary,
      }}
    >
      <View>
        <DrawerItemList {...props}></DrawerItemList>
      </View>
      <CustomDrawerItem
        label="Settings"
        onPress={() => props.navigation.navigate("Settings")}
      />
    </Container>
  );
};

type DrawerItemProps = {
  label: string;
  onPress: () => void;
};

export const CustomDrawerItem = ({ ...props }: DrawerItemProps) => {
  const theme = useTheme();

  return (
    <DrawerItem {...props} inactiveTintColor={theme.color.text.secondary} />
  );
};
