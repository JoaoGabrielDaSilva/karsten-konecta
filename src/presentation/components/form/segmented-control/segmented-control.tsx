import React, { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { Control, Controller, useController } from "react-hook-form";
import { Container, Label, Option } from "./styles";

export type SegmentedControlProps = {
  label?: string;
  name: string;
  defaultValue?: string;
  options: { label: string; value: string }[];
  control: Control<any, any>;
  onChange?: (value: string) => void;
  testID?: string;
};

export const SegmentedControl = ({
  label,
  options,
  control,
  name,
  defaultValue,
  onChange,
}: SegmentedControlProps) => {
  const {
    field: { value, onChange: onPress },
  } = useController({
    control,
    name,
    defaultValue:
      options?.find((option) => option.value === defaultValue)?.value ||
      options[0].value,
  });

  const handleChange = (value: string) => {
    onPress(value);

    onChange && onChange(value);
  };

  return (
    <>
      {label ? <Label>{label}</Label> : null}
      <Container>
        {options
          ? options.map((option, index) => {
              const isSelected = option.value === value;
              return (
                <TouchableOpacity
                  key={index}
                  testID={`option-${option.value}`}
                  style={{ flex: 1 }}
                  activeOpacity={0.8}
                  disabled={isSelected}
                  onPress={() => handleChange(option.value)}
                >
                  <Option bold={isSelected} isSelected={isSelected}>
                    {option.label}
                  </Option>
                </TouchableOpacity>
              );
            })
          : null}
      </Container>
    </>
  );
};
