import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { string } from "yup/lib/locale";
import { Container, Text } from "./styles";

export type ButtonProps = {
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
}: ButtonProps) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      disabled={disabled || loading}
      style={containerStyle}
      {...props}
    >
      <Container style={buttonStyle} disabled={disabled || loading}>
        {!loading ? (
          <Text style={textStyle} textAlign="center">
            {text}
          </Text>
        ) : (
          <ActivityIndicator
            color={theme.color.text.inverted}
            testID={props.testID ? `${props.testID}-loader` : ""}
          />
        )}
      </Container>
    </TouchableOpacity>
  );
};
