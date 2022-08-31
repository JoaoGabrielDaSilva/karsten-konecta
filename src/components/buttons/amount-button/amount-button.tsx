import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { ButtonContainer, Container, Text } from "./styles";

type ButtonProps = {
  text: string;
  disabled?: boolean;
  centerOne?: boolean;
};

type Props = {
  amount: number;
  maxAmount?: number;
  onDecrease: () => void;
  onIncrease: () => void;
  style?: StyleProp<ViewStyle>;
};

export const AmountButton = ({
  amount,
  onDecrease,
  onIncrease,
  maxAmount,
  style,
}: Props) => {
  return (
    <Container style={style} align="center">
      <BorderlessButton
        onPress={() => onDecrease && onDecrease()}
        enabled={amount > 1}
      >
        <Button text="-" disabled={amount === 1} />
      </BorderlessButton>
      <Button text={String(amount)} centerOne />
      <BorderlessButton
        onPress={() => onIncrease && onIncrease()}
        enabled={maxAmount && amount < maxAmount}
      >
        <Button text="+" disabled={maxAmount && amount === maxAmount} />
      </BorderlessButton>
    </Container>
  );
};

const Button = ({ text, disabled, centerOne }: ButtonProps) => {
  return (
    <ButtonContainer centerOne={centerOne}>
      <Text disabled={disabled} centerOne={centerOne}>
        {text}
      </Text>
    </ButtonContainer>
  );
};
