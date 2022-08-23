import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { FlatList, ListRenderItemInfo, View } from "react-native";
import { useTheme } from "styled-components";
import {
  ListEmail,
  ListEmailData,
} from "../../components/list/list-email/list-email";
import { RootPrivateDrawerParamList } from "../../routes";
import { Container } from "./styles";

type NavigationProps = StackScreenProps<
  RootPrivateDrawerParamList,
  "EmailList"
>;

type Props = NavigationProps;

const data = [
  {
    subject: "Class",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste pariatur perferendis hic aperiam corporis tenetur? Fugiat, obcaecati quia deserunt reprehenderit, repellat odio saepe aut deleniti, laboriosam praesentium aliquid beatae vel!",
    senderImageUrl:
      "https://lh3.googleusercontent.com/ogw/AOh-ky2-WfCo_Npg4BpqX4ye3y4WC1F2kgyXwEVc1BG7LQ=s32-c-mo",
  },
  {
    subject: "Class",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste pariatur perferendis hic aperiam corporis tenetur? Fugiat, obcaecati quia deserunt reprehenderit, repellat odio saepe aut deleniti, laboriosam praesentium aliquid beatae vel!",
    senderImageUrl:
      "https://lh3.googleusercontent.com/ogw/AOh-ky2-WfCo_Npg4BpqX4ye3y4WC1F2kgyXwEVc1BG7LQ=s32-c-mo",
  },
  {
    subject: "Class",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste pariatur perferendis hic aperiam corporis tenetur? Fugiat, obcaecati quia deserunt reprehenderit, repellat odio saepe aut deleniti, laboriosam praesentium aliquid beatae vel!",
    senderImageUrl:
      "https://lh3.googleusercontent.com/ogw/AOh-ky2-WfCo_Npg4BpqX4ye3y4WC1F2kgyXwEVc1BG7LQ=s32-c-mo",
  },
];

export const EmailList = ({}: Props) => {
  const theme = useTheme();

  return (
    <Container>
      <FlatList
        data={data}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item }: ListRenderItemInfo<ListEmailData>) => (
          <ListEmail {...item} />
        )}
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.xl,
        }}
      />
    </Container>
  );
};
