import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Filter } from "../../models/filter-model";

import { Container, Label, Value, RemoveIcon } from "./styles";

type Props = Filter & {
  handleRemove?: (params: { key: string }) => void;
  style?: StyleProp<ViewStyle>;
};

export const FilterTag = ({
  label,
  value,
  hideRemove,
  handleRemove,
  key,
  style,
}: Props) => {
  return (
    <Container align="center" style={style}>
      <Value>
        <Label bold>{label}: </Label>
        {value}
      </Value>
      {!hideRemove && (
        <BorderlessButton
          onPress={() => handleRemove({ key })}
          hitSlop={{ vertical: 20, horizontal: 20 }}
        >
          <RemoveIcon name="close" />
        </BorderlessButton>
      )}
    </Container>
  );
};
