import React from "react";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { formatDateToDisplay } from "../../../utils/date/format-date-to-display";

import {
  Container,
  Content,
  Date,
  Image,
  NotRead,
  Sender,
  Title,
} from "./styles";

export type ListEmailData = {
  subject: string;
  content: string;
  date: Date;
  sender: string;
  read?: boolean;
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
  read,
}: Props) => {
  return (
    <RectButton onPress={() => onPress && onPress()}>
      <Container align="center" read={read}>
        {read && <NotRead />}
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
