import { Feather } from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer/lib/typescript/src/types";
import React, { useMemo } from "react";
import { SectionList, SectionListRenderItemInfo } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { MenuModel } from "../../../domain/models/menu-model";
import { RootPrivateStackParamList } from "../../routes";
import { useUserStore } from "../../store/user";
import { ListRow } from "../list/list-row/list-row";
import { DrawerHeader } from "./drawer-header/drawer-header";

import { LogoutListRow, MenuItem, StyledSectionTitle, Version } from "./styles";

type Props = DrawerContentComponentProps;

type RouteMenuItem = {
  label: string;
  name: keyof RootPrivateStackParamList;
  onPress: () => void;
  icon: keyof typeof Feather.glyphMap;
};

const ICON: keyof typeof Feather.glyphMap = "activity";

const routeConfigs = {};

export const Drawer = ({
  navigation: { navigate },
  state,
  ...props
}: Props) => {
  const theme = useTheme();
  const { logoutUser, menuList } = useUserStore();

  const currentRoute = state.routes[state.index]?.name;

  return (
    <SectionList
      sections={menuList}
      keyExtractor={(_, index) => String(index)}
      renderItem={({
        item,
        index,
        section: { data },
      }: SectionListRenderItemInfo<MenuModel>) => {
        const active = currentRoute === item.name;

        return (
          <MenuItem
            leftIcon={item.icon || ICON}
            background={
              active ? theme.color.blue[100] : theme.color.background.primary
            }
            color={active ? theme.color.blue[300] : theme.color.text.secondary}
            rightIcon="chevron-right"
            leftIconFamily="feather"
            borderless
            // borderless={index === data.length - 1}
            rightIconFamily="feather"
            label={item.name}
            textStyle={{
              fontSize: RFValue(theme.fontSize.sm),
            }}
            {...item}
          />
        );
      }}
      stickySectionHeadersEnabled={false}
      renderSectionHeader={({ section }) => (
        <StyledSectionTitle>{section.title}</StyledSectionTitle>
      )}
      contentContainerStyle={{
        paddingVertical: theme.spacing.xl,
      }}
      style={{
        paddingHorizontal: theme.spacing.lg,
      }}
      ListHeaderComponent={<DrawerHeader />}
      ListFooterComponent={
        <>
          <LogoutListRow
            label="Sair"
            rightIcon="chevron-right"
            rightIconFamily="feather"
            borderless
            onPress={logoutUser}
            color={theme.color.red[500]}
          />
          <Version>versão 0.0.1</Version>
        </>
      }
    />
  );
};

type DrawerItemProps = {
  label: string;
  onPress: () => void;
  isActive?: boolean;
};
