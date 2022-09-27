import { Feather } from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer/lib/typescript/src/types";
import React, { useState } from "react";
import { SectionList, SectionListRenderItemInfo, Share } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { MenuModel } from "../../../domain/models/menu-model";
import { useUserStore } from "../../store/user";
import { Modal } from "../modal/modal";
import { DrawerHeader } from "./drawer-header/drawer-header";
// import * as Sharing from "expo-sharing";
import file from "../../assets/images/karsten-logo.jpg";

import { LogoutListRow, MenuItem, StyledSectionTitle, Version } from "./styles";

type Props = DrawerContentComponentProps;

const ICON: keyof typeof Feather.glyphMap = "activity";

export const Drawer = ({
  navigation: { navigate, closeDrawer },
  state,
  ...props
}: Props) => {
  const theme = useTheme();
  const { logoutUser, menuList } = useUserStore();

  const currentRoute = state.routes[state.index]?.name;

  const [modalState, setModalState] = useState(false);

  const closeModal = () => setModalState(false);

  const handleLogout = async () => {
    logoutUser();
    closeDrawer();
  };

  return (
    <>
      <Modal
        visible={modalState}
        onPressOverlay={closeModal}
        title="Desejar deslogar"
        text="Ao concordar você será desconectado da aplicação!"
        confirmLabel="Sim"
        cancelLabel="Não"
        confirm={handleLogout}
        cancel={closeModal}
      />
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
              color={
                active ? theme.color.blue[300] : theme.color.text.secondary
              }
              rightIcon="chevron-right"
              leftIconFamily="feather"
              borderless
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
              onPress={() => setModalState(!modalState)}
              color={theme.color.red[500]}
            />
            <Version>versão 0.0.1</Version>
          </>
        }
      />
    </>
  );
};
