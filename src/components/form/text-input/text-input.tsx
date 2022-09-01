import React from "react";
import { Control, Controller, useController } from "react-hook-form";
import {
  ActivityIndicator,
  Dimensions,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  TextInputFocusEventData,
  TextInputProps,
  ViewStyle,
} from "react-native";
import {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "styled-components/native";
import { cepMask } from "../../../utils/mask/cep-mask";
import { cpfMask } from "../../../utils/mask/cpf-mask";
import { phoneMask } from "../../../utils/mask/phone-mask";
import {
  Container,
  Input,
  ClearIcon,
  Placeholder,
  InputContainer,
  CustomErrorMessage,
} from "./styles";

const { width } = Dimensions.get("window");

enum InputState {
  UNFOCUSED,
  FOCUSED,
}

const PLACEHOLDER_POSITIONS = {
  [InputState.FOCUSED]: {
    left: 10,
    top: 0,
  },
  [InputState.UNFOCUSED]: {
    left: 20,
    top: width * 0.15 * 0.35,
  },
};

type TypeConfig = {
  maxLength?: number;
  onChange: (value: string) => string;
  keyboardType?: KeyboardTypeOptions;
};

const inputConfigObject: { [key: string]: TypeConfig } = {
  cpf: {
    maxLength: 14,
    onChange: cpfMask,
    keyboardType: "number-pad",
  },
  cep: {
    maxLength: 9,
    onChange: cepMask,
    keyboardType: "number-pad",
  },
  phone: {
    maxLength: 15,
    onChange: phoneMask,
    keyboardType: "number-pad",
  },
};

type Props = TextInputProps & {
  name: string;
  control: any;
  mask?: keyof typeof inputConfigObject;
  defaultValue?: Control<any, any>;
  style?: StyleProp<ViewStyle>;
  onMaxLength?: () => void;
  loading?: boolean;
  disableFloatingPlaceholder?: boolean;
  size?: "small" | "normal";
};

const INPUT_RANGE = [InputState.FOCUSED, InputState.UNFOCUSED];

export const TextInput = ({
  name,
  defaultValue,
  control,
  style,
  onMaxLength,
  mask,
  loading,
  placeholder,
  keyboardType,
  size = "normal",
  editable = true,
  disableFloatingPlaceholder,
  ...props
}: Props) => {
  const {
    field: { value, onChange },

    fieldState: { error },
  } = useController({ name, control });
  const theme = useTheme();

  const clearValue = () => onChange("");

  const state = useSharedValue(
    defaultValue ? InputState.FOCUSED : InputState.UNFOCUSED
  );

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (!disableFloatingPlaceholder) {
      state.value = withTiming(InputState.FOCUSED);
    }

    props.onBlur && props.onFocus(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (!disableFloatingPlaceholder) {
      state.value = withTiming(InputState.UNFOCUSED);
    }

    props.onFocus && props.onBlur(e);
  };

  const containerStyles = useAnimatedStyle(() => {
    return {
      borderColor: !error
        ? interpolateColor(state.value, INPUT_RANGE, [
            theme.color.background.emphasis,
            theme.color.background.secondary,
          ])
        : theme.color.red[500],
    };
  });
  const placeholderStyles = useAnimatedStyle(() => {
    return {
      fontSize: value ? 12 : interpolate(state.value, INPUT_RANGE, [12, 15]),
      color: !error
        ? interpolateColor(state.value, INPUT_RANGE, [
            theme.color.text.primary,
            theme.color.text.secondary,
          ])
        : theme.color.red[500],
      top: !value
        ? interpolate(state.value, INPUT_RANGE, [
            PLACEHOLDER_POSITIONS[InputState.FOCUSED].top,
            PLACEHOLDER_POSITIONS[InputState.UNFOCUSED].top,
          ])
        : PLACEHOLDER_POSITIONS[InputState.FOCUSED].top,
      left: !value
        ? interpolate(state.value, INPUT_RANGE, [
            PLACEHOLDER_POSITIONS[InputState.FOCUSED].left,
            PLACEHOLDER_POSITIONS[InputState.UNFOCUSED].left,
          ])
        : PLACEHOLDER_POSITIONS[InputState.FOCUSED].left,
    };
  });

  return (
    <Container style={style}>
      <InputContainer
        style={[containerStyles]}
        align="center"
        size={size}
        editable={editable && !loading}
      >
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={() => (
            <>
              <Input
                error={!!error}
                value={value}
                onChangeText={(value) => {
                  mask
                    ? onChange(inputConfigObject[mask].onChange(value))
                    : onChange(value);

                  if (
                    onMaxLength &&
                    value.length === inputConfigObject[mask]?.maxLength
                  )
                    onMaxLength();
                }}
                maxLength={
                  props?.maxLength || inputConfigObject[mask]?.maxLength || 100
                }
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={disableFloatingPlaceholder ? placeholder : ""}
                placeholderTextColor={
                  !error
                    ? disableFloatingPlaceholder
                      ? theme.color.text.secondary
                      : "transparent"
                    : theme.color.red[500]
                }
                editable={!loading && editable}
                keyboardType={
                  keyboardType ||
                  inputConfigObject[mask]?.keyboardType ||
                  "default"
                }
                {...props}
              />
              {placeholder && !disableFloatingPlaceholder ? (
                <Placeholder style={placeholderStyles}>
                  {placeholder}
                </Placeholder>
              ) : null}
              {loading && (
                <ActivityIndicator color={theme.color.text.primary} />
              )}
            </>
          )}
        />
        {value && !loading && (
          <ClearIcon name="ios-close-circle-outline" onPress={clearValue} />
        )}
      </InputContainer>
      {error?.message ? (
        <CustomErrorMessage>{error.message}</CustomErrorMessage>
      ) : null}
    </Container>
  );
};
