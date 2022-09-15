import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { string } from "yup/lib/locale";
import { Container, Text } from "./styles";

type Props = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  textStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  testID?: string;
};

export const Button = ({
  text,
  onPress,
  loading,
  disabled,
  containerStyle,
  buttonStyle,
  textStyle,
  ...props
}: Props) => {
  const theme = useTheme();

  return (
    <BorderlessButton
      onPress={onPress}
      enabled={!disabled && !loading}
      style={containerStyle}
      {...props}
    >
      <Container style={buttonStyle} disabled={disabled || loading}>
        {!loading ? (
          <Text style={textStyle} textAlign="center">
            {text}
          </Text>
        ) : (
          <ActivityIndicator color={theme.color.text.inverted} />
        )}
      </Container>
    </BorderlessButton>
  );
};
