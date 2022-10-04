import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "styled-components/native";
import { ButtonContainer, Container, Text } from "./styles";

type ButtonProps = {
  text: string;
  disabled?: boolean;
  centerOne?: boolean;
  loading?: boolean;
  testID?: string;
};

export type AmountButtonProps = {
  amount: number;
  maxAmount?: number;
  onDecrease: () => void;
  onIncrease: () => void;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  disabled?: boolean;
  testID?: string;
};

export const AmountButton = ({
  amount,
  onDecrease,
  onIncrease,
  maxAmount,
  style,
  loading,
  disabled,
  ...props
}: AmountButtonProps) => {
  return (
    <Container style={style} align="center">
      <TouchableOpacity
        testID={`${props.testID}-decrease`}
        onPress={() => onDecrease && onDecrease()}
        disabled={amount === 1 || disabled}
      >
        <Button text="-" disabled={amount === 1 || disabled} />
      </TouchableOpacity>
      <Button
        testID={`${props.testID}-amount`}
        text={String(amount)}
        centerOne
        loading={loading}
      />
      <TouchableOpacity
        testID={`${props.testID}-increase`}
        onPress={() => onIncrease && onIncrease()}
        disabled={(maxAmount && amount === maxAmount) || disabled}
      >
        <Button
          text="+"
          disabled={(maxAmount && amount === maxAmount) || disabled}
        />
      </TouchableOpacity>
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
