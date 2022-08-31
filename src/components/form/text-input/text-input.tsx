import React from "react";
import { Control, Controller, useController } from "react-hook-form";
import {
  ActivityIndicator,
  Dimensions,
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
import { cpfMask } from "../../../utils/mask/cpf-mask";
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

const maskList = {
  cpf: {
    maxLength: 14,
    onChange: cpfMask,
  },
};

type Props = TextInputProps & {
  name: string;
  control: any;
  mask?: keyof typeof maskList;
  defaultValue?: Control<any, any>;
  style?: StyleProp<ViewStyle>;
  onMaxLength?: (value: string) => void;
  loading?: boolean;
  showError?: boolean;
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
  showError,
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
    state.value = withTiming(InputState.FOCUSED);

    props.onBlur && props.onBlur(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    state.value = withTiming(InputState.UNFOCUSED);

    props.onFocus && props.onFocus(e);
  };

  const containerStyles = useAnimatedStyle(() => {
    return {
      borderColor: interpolateColor(state.value, INPUT_RANGE, [
        theme.color.background.emphasis,
        theme.color.background.secondary,
      ]),
    };
  });
  const placeholderStyles = useAnimatedStyle(() => {
    return {
      fontSize: value ? 12 : interpolate(state.value, INPUT_RANGE, [12, 15]),
      color: interpolateColor(state.value, INPUT_RANGE, [
        theme.color.text.primary,
        theme.color.text.secondary,
      ]),
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
      <InputContainer style={[containerStyles]} align="center">
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={() => (
            <>
              <Input
                value={value}
                onChangeText={(value) => {
                  if (onMaxLength && value.length === maskList[mask]?.maxLength)
                    onMaxLength(value);

                  mask
                    ? onChange(maskList[mask].onChange(value))
                    : onChange(value);
                }}
                maxLength={props?.maxLength || maskList[mask]?.maxLength || 100}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...props}
              />
              {props.placeholder ? (
                <Placeholder style={placeholderStyles}>
                  {props.placeholder}
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
      {showError && error?.message ? (
        <CustomErrorMessage>{error.message}</CustomErrorMessage>
      ) : null}
    </Container>
  );
};
