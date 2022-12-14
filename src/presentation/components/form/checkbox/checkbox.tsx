import React from "react";
import { Control, Controller } from "react-hook-form";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { Typography } from "../../utils";
import { Check, Container, Fill, Label, StyledRow } from "./styles";

export type CheckboxProps = {
  name: string;
  label: string;
  control: Control<any, any>;
  defaultValue?: boolean;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  testID?: string;
};

export const Checkbox = ({
  label,
  style,
  disabled,
  testID,
  defaultValue,
  ...props
}: CheckboxProps) => {
  return (
    <Controller
      {...props}
      defaultValue={defaultValue || false}
      render={({ field: { value, onChange } }) => (
        <Pressable
          onPress={() => onChange(!value)}
          disabled={disabled}
          testID={testID}
        >
          <StyledRow align="center" style={style} disabled={disabled}>
            <Container>
              {value && (
                <Fill active={!!value}>
                  <Check name="check" />
                </Fill>
              )}
            </Container>
            <Label semibold>{label}</Label>
          </StyledRow>
        </Pressable>
      )}
    />
  );
};
