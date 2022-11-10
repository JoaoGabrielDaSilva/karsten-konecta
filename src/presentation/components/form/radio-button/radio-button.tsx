import { Control, Controller } from "react-hook-form";
import {
  RadioButton,
  RadioButtonProps,
} from "../../buttons/radio-button/radio-button";

export type FormRadioButtonProps = Omit<RadioButtonProps, "active"> & {
  control: Control<any, any>;
  name: string;
  defaultValue?: boolean;
  testID?: string;
};

export const FormRadioButton = ({
  label,
  onPress,
  testID,
  name,
  defaultValue,
  control,
  ...props
}: FormRadioButtonProps) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field: { value, onChange } }) => (
        <RadioButton
          {...props}
          variant="small"
          active={value}
          label={label}
          testID={testID}
          onPress={() => {
            onChange(true);
            onPress && onPress();
          }}
        />
      )}
    />
  );
};
