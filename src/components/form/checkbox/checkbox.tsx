import React from "react";
import { Control, Controller } from "react-hook-form";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { Typography } from "../../utils";
import { Check, Container, Fill, StyledRow } from "./styles";

type Props = {
  name: string;
  label: string;
  control: Control<any, any>;
  defaultValue?: boolean;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

export const Checkbox = ({ label, style, disabled, ...props }: Props) => {
  return (
    <Controller
      {...props}
      render={({ field: { value, onChange } }) => (
        <Pressable onPress={() => onChange(!value)} disabled={disabled}>
          <StyledRow align="center" style={style} disabled={disabled}>
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
