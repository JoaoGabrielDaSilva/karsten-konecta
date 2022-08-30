import React from "react";
import { SectionList, SectionListRenderItemInfo } from "react-native";
import { useTheme } from "styled-components";
import { ListRowProps } from "../../components/list/list-row/list-row";
import { ToggleListRowProps } from "../../components/list/toggle-list-row/toggle-list-row";
import { useThemeStore } from "../../store/theme";

import { Container, CustomListRow, SectionHeader, Navbar } from "./styles";

type Section = {
  title: string;
  data: ToggleListRowProps[];
};

const sections: Section[] = [
  {
    title: "Tema",
    data: [
      {
        label: "Tema",
        onToggle: useThemeStore.getState().toggleTheme,
      },
    ],
  },
];

export const Settings = () => {
  const theme = useTheme();

  return (
    <Container>
      <Navbar />
      <SectionList
        bounces={false}
        sections={sections}
        renderItem={({
          item,
        }: SectionListRenderItemInfo<ToggleListRowProps, Section>) => (
          <CustomListRow label={item.label} onToggle={item.onToggle} />
        )}
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.xl,
        }}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader variant="heading">{title}</SectionHeader>
        )}
      />
    </Container>
  );
};
