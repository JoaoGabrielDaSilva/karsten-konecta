import { Control, Controller } from "react-hook-form";
import {
  RadioButton,
  RadioButtonProps,
} from "../../buttons/radio-button/radio-button";

type Props = Omit<RadioButtonProps, "active"> & {
  control: Control<any, any>;
  name: string;
  defaultValue?: boolean;
};

export const FormRadioButton = ({ label, onPress, ...props }: Props) => {
  return (
    <Controller
      {...props}
      render={({ field: { value, onChange } }) => (
        <RadioButton
          variant="small"
          active={value}
          label={label}
          onPress={() => {
            onChange(true);
            onPress && onPress();
          }}
        />
      )}
    />
  );
};
