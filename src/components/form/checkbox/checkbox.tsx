import React from "react";
import { Control, Controller } from "react-hook-form";
import {
  Pressable,
  StyleProp,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Typography } from "../../utils";
import { Check, Container, Fill, StyledRow } from "./styles";

type Props = {
  name: string;
  label: string;
  control: Control<any>;
  defaultValue?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const Checkbox = ({ label, style, ...props }: Props) => {
  return (
    <Controller
      {...props}
      render={({ field: { value, onChange } }) => (
        <Pressable onPress={() => onChange(!value)}>
          <StyledRow align="center" style={style}>
            <Container>
              {value && (
                <Fill active={!!value}>
                  <Check name="check" />
                </Fill>
              )}
            </Container>
            <Typography semibold>{label}</Typography>
          </StyledRow>
        </Pressable>
      )}
    />
  );
};
