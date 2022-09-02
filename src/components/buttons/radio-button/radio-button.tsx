import React from "react";
import { Pressable } from "react-native";
import { Container, Fill } from "./styles";

type Props = {
  active?: boolean;
  onPress?: () => void;
};

export const RadioButton = ({ active, onPress }: Props) => {
  return (
    <Pressable onPress={onPress}>
      <Container>{active && <Fill />}</Container>
    </Pressable>
  );
};
