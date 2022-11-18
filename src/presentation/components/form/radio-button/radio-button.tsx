import { Path, Control, useController } from "react-hook-form";
import { Radio, Flex } from "native-base";

export type RadioButtonGroupItem<I> = {
  label: string;
  value: I;
};

export type RadioButtonGroupProps<T, I = string> = {
  name: Path<T>;
  control: Control<T, any>;
  options: RadioButtonGroupItem<I>[];
  onChange: (value: I) => void;
};

export const RadioButtonGroup = <T, I>({
  options,
  name,
  control,
  onChange,
}: RadioButtonGroupProps<T, I>) => {
  const {
    field: { value, onChange: onPress },
  } = useController({ name, control });

  const handlePress = (option: I) => {
    onPress(option);
    onChange && onChange(option);
  };

  return (
    <Radio.Group
      name="type"
      onChange={(item) => handlePress(item as I)}
      defaultValue={value as string}
    >
      <Flex direction="row" justify="space-between" w="full" mb="4">
        {options
          ? options.map((option, index) => (
              <Radio key={index} value={option.value as string}>
                {option.label}
              </Radio>
            ))
          : null}
      </Flex>
    </Radio.Group>
  );
};
