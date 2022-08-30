import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { useForm } from "react-hook-form";
import { FlatList, ListRenderItemInfo } from "react-native";
import { useTheme } from "styled-components";
import { ListEmail, ListEmailData, Row, Typography } from "../../components";
import { RootPrivateStackParamList } from "../../routes";
import { useEmailStore } from "../../store/email";
import { Container, Input, SearchBar } from "./styles";

type NavigationProps = StackScreenProps<RootPrivateStackParamList, "Search">;

type Props = NavigationProps;

export const Search = ({ navigation: { navigate, goBack } }: Props) => {
  const { control, watch } = useForm();
  const theme = useTheme();
  const { emailList } = useEmailStore();

  const searchInputName = "search";

  const searchValue = watch(searchInputName);

  const filteredData = searchValue
    ? emailList.filter((email) => {
        if (email.subject.match(searchValue)) return -1;
        if (email.content.match(searchValue)) return -1;
        if (email.sender.match(searchValue)) return -1;
      })
    : emailList;

  console.log("RENDER");

  return (
    <Container>
      <SearchBar justify="space-between" align="center">
        <Input
          name={searchInputName}
          control={control}
          placeholder="Buscar por"
        />
        <Typography onPress={goBack}>Cancelar</Typography>
      </SearchBar>
      <FlatList
        data={filteredData}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item }: ListRenderItemInfo<ListEmailData>) => (
          <ListEmail {...item} onPress={() => navigate("Email")} />
        )}
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.sm,
        }}
      />
    </Container>
  );
};
