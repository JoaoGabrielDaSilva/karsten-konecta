import React from "react";
import { ActivityIndicator, StyleProp, ViewStyle } from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { ButtonContainer, Container, Text } from "./styles";

type ButtonProps = {
  text: string;
  disabled?: boolean;
  centerOne?: boolean;
  loading?: boolean;
};

type Props = {
  amount: number;
  maxAmount?: number;
  onDecrease: () => void;
  onIncrease: () => void;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  disabled?: boolean;
};

export const AmountButton = ({
  amount,
  onDecrease,
  onIncrease,
  maxAmount,
  style,
  loading,
  disabled,
}: Props) => {
  return (
    <Container style={style} align="center">
      <BorderlessButton
        onPress={() => onDecrease && onDecrease()}
        enabled={amount > 1 && !disabled}
      >
        <Button text="-" disabled={amount === 1 || disabled} />
      </BorderlessButton>
      <Button text={String(amount)} centerOne loading={loading} />
      <BorderlessButton
        onPress={() => onIncrease && onIncrease()}
        enabled={(!maxAmount || (maxAmount && amount < maxAmount)) && !disabled}
      >
        <Button
          text="+"
          disabled={(maxAmount && amount === maxAmount) || disabled}
        />
      </BorderlessButton>
    </Container>
  );
};

const Button = ({ text, disabled, centerOne, loading }: ButtonProps) => {
  const theme = useTheme();

  return (
    <ButtonContainer centerOne={centerOne}>
      {centerOne && loading ? (
        <ActivityIndicator color={theme.color.text.primary} size="small" />
      ) : (
        <Text disabled={disabled} centerOne={centerOne}>
          {text}
        </Text>
      )}
    </ButtonContainer>
  );
};
