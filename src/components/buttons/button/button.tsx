import React from "react";
import { ActivityIndicator, StyleProp, ViewStyle } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { Container, Text } from "./styles";

type Props = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const Button = ({ text, onPress, loading, disabled, style }: Props) => {
  const theme = useTheme();

  return (
    <BorderlessButton onPress={onPress} enabled={!disabled}>
      <Container style={style} disabled={disabled}>
        {!loading ? (
          <Text textAlign="center"> {text}</Text>
        ) : (
          <ActivityIndicator color={theme.color.text.primary} />
        )}
      </Container>
    </BorderlessButton>
  );
};
