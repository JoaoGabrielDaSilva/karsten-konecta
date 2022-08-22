import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import {
  ListEmail,
  ListEmailData,
} from "../../components/List/ListEmail/ListEmail";
import { RootPrivateStackParamList } from "../../routes";

type NavigationProps = StackScreenProps<RootPrivateStackParamList, "EmailList">;

type Props = NavigationProps;

export const EmailList = ({}: Props) => {
  <FlatList
    data={[1]}
    keyExtractor={(_, index) => String(index)}
    renderItem={({ item }: ListRenderItemInfo<ListEmailData>) => (
      <ListEmail {...item} />
    )}
  />;
};
