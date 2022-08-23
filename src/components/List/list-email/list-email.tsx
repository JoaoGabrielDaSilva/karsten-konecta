import React from "react";
import { Image, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Typography } from "../../utils";

import { Container } from "./styles";

export type ListEmailData = {
  subject: string;
  content: string;
  senderImageUrl: string;
};

type Props = ListEmailData & {
  onPress?: () => void;
};

export const ListEmail = ({
  onPress,
  subject,
  content,
  senderImageUrl,
}: Props) => {
  return (
    <RectButton onPress={() => onPress && onPress()}>
      <Container>
        <View>
          <Image source={{ uri: senderImageUrl }} />
        </View>
        <View>
          <Typography variant="heading">{subject}</Typography>
          <Typography numberOfLines={3}>{content}</Typography>
        </View>
      </Container>
    </RectButton>
  );
};
