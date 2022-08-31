import React from "react";
import { Control, Controller, useController } from "react-hook-form";
import { StyleProp, TextInputProps, ViewStyle } from "react-native";
import { Container, Input, ClearIcon } from "./styles";

type Props = TextInputProps & {
  name: string;
  control: any;
  defaultValue?: Control<any, any>;
  style?: StyleProp<ViewStyle>;
};

export const SearchInput = ({
  name,
  defaultValue,
  control,
  style,
  ...props
}: Props) => {
  const {
    field: { value, onChange },
  } = useController({ name, control });

  const clearValue = () => onChange("");

  return (
    <Container style={style} align="center">
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Input value={value} onChangeText={onChange} {...props} />
        )}
      />
      {value && (
        <ClearIcon name="ios-close-circle-outline" onPress={clearValue} />
      )}
    </Container>
  );
};
