import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { ListRenderItemInfo, SectionList } from "react-native";
import { useTheme } from "styled-components";
import {
  isAfter,
  isBefore,
  isSameDay,
  isToday,
  isYesterday,
  subDays,
} from "date-fns";
import {
  ListEmail,
  ListEmailData,
} from "../../components/list/list-email/list-email";
import { RootPrivateDrawerParamList } from "../../routes";
import { Container } from "./styles";
import { Typography } from "../../components";

type NavigationProps = StackScreenProps<
  RootPrivateDrawerParamList,
  "EmailList"
>;

type Props = NavigationProps;

const data = [
  {
    subject: "Today Date",
    sender: "João Gabriel",
    date: new Date(),
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste pariatur perferendis hic aperiam corporis tenetur? Fugiat, obcaecati quia deserunt reprehenderit, repellat odio saepe aut deleniti, laboriosam praesentium aliquid beatae vel!",
    senderImageUrl:
      "https://yt3.ggpht.com/yti/AJo0G0keGO8w7HSrgBiA83C10ruLrf9thc1QwZ3E5fRfoA=s88-c-k-c0x00ffffff-no-rj-mo",
  },
  {
    subject: "Today Date",
    sender: "João Gabriel",
    date: new Date(),
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste pariatur perferendis hic aperiam corporis tenetur? Fugiat, obcaecati quia deserunt reprehenderit, repellat odio saepe aut deleniti, laboriosam praesentium aliquid beatae vel!",
    senderImageUrl:
      "https://yt3.ggpht.com/yti/AJo0G0keGO8w7HSrgBiA83C10ruLrf9thc1QwZ3E5fRfoA=s88-c-k-c0x00ffffff-no-rj-mo",
  },
  {
    subject: "Yesterday Date",
    sender: "João Gabriel",
    date: subDays(new Date(), 1),
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste pariatur perferendis hic aperiam corporis tenetur? Fugiat, obcaecati quia deserunt reprehenderit, repellat odio saepe aut deleniti, laboriosam praesentium aliquid beatae vel!",
    senderImageUrl:
      "https://yt3.ggpht.com/yti/AJo0G0keGO8w7HSrgBiA83C10ruLrf9thc1QwZ3E5fRfoA=s88-c-k-c0x00ffffff-no-rj-mo",
  },
  {
    subject: "Last 7 Days Date",
    sender: "João Gabriel",
    date: subDays(new Date(), 7),
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste pariatur perferendis hic aperiam corporis tenetur? Fugiat, obcaecati quia deserunt reprehenderit, repellat odio saepe aut deleniti, laboriosam praesentium aliquid beatae vel!",
    senderImageUrl:
      "https://yt3.ggpht.com/yti/AJo0G0keGO8w7HSrgBiA83C10ruLrf9thc1QwZ3E5fRfoA=s88-c-k-c0x00ffffff-no-rj-mo",
  },
];

const sections = [
  {
    title: "",
    data,
  },
];

export const EmailList = ({ navigation: { navigate } }: Props) => {
  const theme = useTheme();

  return (
    <Container>
      <SectionList
        sections={sections}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item, index }: ListRenderItemInfo<ListEmailData>) => (
          <ListEmail
            {...item}
            onPress={() => navigate("Email")}
            read={index % 3 === 0}
          />
        )}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.lg,
        }}
        renderSectionHeader={({ section: { title } }) => (
          <Typography>{title}</Typography>
        )}
      />
    </Container>
  );
};
