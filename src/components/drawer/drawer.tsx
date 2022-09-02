import { Feather } from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer/lib/typescript/src/types";
import React, { useMemo } from "react";
import { SectionListRenderItem, SectionListRenderItemInfo } from "react-native";
import { SectionList, SectionListData } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { RootPrivateStackParamList } from "../../routes";
import { ListRow } from "../list/list-row/list-row";
import { DrawerHeader } from "./drawer-header/drawer-header";

import { DrawerItemContainer, DrawerItemLabel } from "./styles";

type Props = DrawerContentComponentProps;

type RouteMenuItem = {
  label: string;
  name: keyof RootPrivateStackParamList;
  onPress: () => void;
  icon: keyof typeof Feather.glyphMap;
};

export const Drawer = ({
  navigation: { navigate },
  state,
  ...props
}: Props) => {
  const theme = useTheme();

  const currentRoute = state.routes[state.index]?.name;

  const sections = useMemo(
    () => [
      {
        title: "RelacionamentoDigital",
        data: [
          {
            label: "Registrar Cliente",
            name: "CustomerRegister",
            onPress: () => navigate("CustomerRegister"),
            icon: "user-plus",
          },
        ],
      },
    ],
    []
  );

  return (
    <SectionList
      sections={sections}
      keyExtractor={(_, index) => String(index)}
      renderItem={({ item }: SectionListRenderItemInfo<RouteMenuItem>) => {
        const active = currentRoute === item.name;

        return (
          <ListRow
            leftIcon={item.icon}
            background={
              active ? theme.color.blue[100] : theme.color.background.primary
            }
            style={{
              marginTop: theme.spacing.lg,
              paddingHorizontal: theme.spacing.lg,
            }}
            color={active ? theme.color.blue[300] : theme.color.text.secondary}
            rightIcon="chevron-right"
            borderless
            leftIconFamily="feather"
            rightIconFamily="feather"
            {...item}
          />
        );
      }}
      contentContainerStyle={{
        paddingVertical: theme.spacing.xl,
      }}
      style={{
        paddingHorizontal: theme.spacing.lg,
      }}
      ListHeaderComponent={<DrawerHeader />}
    />
  );
};

type DrawerItemProps = {
  label: string;
  onPress: () => void;
  isActive?: boolean;
};

export const CustomDrawerItem = ({
  isActive,
  label,
  ...props
}: DrawerItemProps) => {
  const theme = useTheme();

  return (
    <DrawerItemContainer
      style={{
        backgroundColor: !isActive
          ? theme.color.blue[100]
          : theme.color.background.primary,
      }}
    >
      <DrawerItemLabel
        semibold
        color={!isActive ? theme.color.blue[300] : theme.color.text.secondary}
      >
        {label}
      </DrawerItemLabel>
    </DrawerItemContainer>
  );
};
