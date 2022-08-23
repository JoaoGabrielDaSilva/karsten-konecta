import React from "react";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Typography } from "../../utils";
import { formatDateToDisplay } from "../../../utils/date/format-date-to-display";

import { Container, Content, Date, Image, Sender, Title } from "./styles";

export type ListEmailData = {
  subject: string;
  content: string;
  senderImageUrl: string;
  date: Date;
  sender: string;
};

type Props = ListEmailData & {
  onPress?: () => void;
};

export const ListEmail = ({
  onPress,
  subject,
  content,
  date,
  sender,
  senderImageUrl,
}: Props) => {
  return (
    <RectButton onPress={() => onPress && onPress()}>
      <Container align="center">
        {/* <Image source={{ uri: senderImageUrl }} resizeMode="contain" /> */}
        <View style={{ flex: 1 }}>
          <Sender variant="heading" bold>
            {sender}
          </Sender>
          <Title variant="subtitle" semibold>
            {subject}
          </Title>
          <Content numberOfLines={2}>{content}</Content>
        </View>
        <Date>{formatDateToDisplay({ date })}</Date>
      </Container>
    </RectButton>
  );
};
