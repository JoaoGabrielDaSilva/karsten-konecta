import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { FlatList, ListRenderItemInfo, View } from "react-native";
import { useTheme } from "styled-components";
import { subDays } from "date-fns";
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
    sender: "João Gabriel",
    date: new Date(),
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste pariatur perferendis hic aperiam corporis tenetur? Fugiat, obcaecati quia deserunt reprehenderit, repellat odio saepe aut deleniti, laboriosam praesentium aliquid beatae vel!",
    senderImageUrl:
      "https://yt3.ggpht.com/yti/AJo0G0keGO8w7HSrgBiA83C10ruLrf9thc1QwZ3E5fRfoA=s88-c-k-c0x00ffffff-no-rj-mo",
  },
  {
    subject: "Class",
    sender: "João Gabriel",
    date: subDays(new Date(), 1),
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste pariatur perferendis hic aperiam corporis tenetur? Fugiat, obcaecati quia deserunt reprehenderit, repellat odio saepe aut deleniti, laboriosam praesentium aliquid beatae vel!",
    senderImageUrl:
      "https://yt3.ggpht.com/yti/AJo0G0keGO8w7HSrgBiA83C10ruLrf9thc1QwZ3E5fRfoA=s88-c-k-c0x00ffffff-no-rj-mo",
  },
  {
    subject: "Class",
    sender: "João Gabriel",
    date: subDays(new Date(), 10),
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste pariatur perferendis hic aperiam corporis tenetur? Fugiat, obcaecati quia deserunt reprehenderit, repellat odio saepe aut deleniti, laboriosam praesentium aliquid beatae vel!",
    senderImageUrl:
      "https://yt3.ggpht.com/yti/AJo0G0keGO8w7HSrgBiA83C10ruLrf9thc1QwZ3E5fRfoA=s88-c-k-c0x00ffffff-no-rj-mo",
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
