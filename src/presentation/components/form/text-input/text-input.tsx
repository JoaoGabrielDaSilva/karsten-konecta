import { Control, Path, useController } from "react-hook-form";
import { KeyboardTypeOptions } from "react-native";
import { formatWithMask, Masks } from "react-native-mask-input";
import {
  Input,
  Stack,
  Skeleton,
  Flex,
  Spinner,
  IInputProps,
  IStackProps,
} from "native-base";
import { Typography } from "../../utils";
import { useState } from "react";

type MaskConfig = {
  [key: string]: {
    keyboardType: KeyboardTypeOptions;
    maxLength: number;
    onChangeText: (value: string) => string;
    placeholder?: string;
  };
};

const maskConfig: MaskConfig = {
  cpf: {
    keyboardType: "number-pad",
    placeholder: "CPF",
    maxLength: 14,
    onChangeText: (value: string) =>
      formatWithMask({ text: value, mask: Masks.BRL_CPF }).masked,
  },
  cnpj: {
    keyboardType: "number-pad",
    placeholder: "CNPJ",
    maxLength: 18,
    onChangeText: (value: string) =>
      formatWithMask({ text: value, mask: Masks.BRL_CNPJ }).masked,
  },
  cpfCnpj: {
    keyboardType: "number-pad",
    placeholder: "CPF/CNPJ",
    maxLength: 18,
    onChangeText: (value: string) => {
      console.log(value.length);
      if (value.length <= 14) {
        return formatWithMask({ text: value, mask: Masks.BRL_CPF }).masked;
      }
      formatWithMask({ text: value, mask: Masks.BRL_CNPJ }).masked;
    },
  },
};

export type TextInputProps<T> = {
  name: Path<T>;
  control: Control<T>;
  disabled?: boolean;
  loading?: boolean;
  fetching?: boolean;
  mask?: keyof typeof maskConfig;
  onMaxLength?: (data: { masked: string; unmasked: string }) => void;
  containerStyle?: IStackProps;
} & IInputProps;

export const TextInput = <T,>({
  control,
  name,
  disabled,
  loading = false,
  fetching = false,
  onMaxLength,
  maxLength,
  mask,
  containerStyle,
  ...props
}: TextInputProps<T>) => {
  const [focused, setFocused] = useState(false);

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController<T>({ control, name });

  return (
    <Stack borderRadius="md" {...containerStyle}>
      <Input
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        editable={!disabled && !loading && !fetching}
        value={value as string}
        p="4"
        fontSize="sm"
        {...(mask ? { ...maskConfig?.[mask] } : {})}
        onChangeText={(text) => {
          const maskedValue = mask ? maskConfig[mask].onChangeText(text) : text;
          const configMaxLength = maxLength || maskConfig?.[mask]?.maxLength;
          onChange(maskedValue);

          if (
            configMaxLength &&
            onMaxLength &&
            maskedValue.length === configMaxLength
          ) {
            onMaxLength({
              masked: maskedValue,
              unmasked: maskedValue.replace(/\D/g, ""),
            });
          }
        }}
        focusOutlineColor={!error ? "primary.500" : "error.500"}
        _focus={{
          bg: "transparent",
        }}
        borderColor={
          !error ? (focused ? "primary.500" : "border.default") : "error.500"
        }
        rightElement={fetching ? <Spinner mr="4" /> : null}
        {...props}
      />
      {error ? (
        <Typography color="error.500" semibold>
          {error.message}
        </Typography>
      ) : null}
      {loading ? (
        <Flex
          position="absolute"
          justify="center"
          align="flex-start"
          p="4"
          w="full"
          h="full"
        >
          <Skeleton w="5/6" h="5/6" bg="white" />
        </Flex>
      ) : null}
    </Stack>
  );
};
