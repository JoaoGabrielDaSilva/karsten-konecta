import { TouchableOpacity } from "@gorhom/bottom-sheet";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { Control, Controller, useController } from "react-hook-form";
import {
  TextInput as RnTextInput,
  ReturnKeyTypeOptions,
  BackHandler,
  Keyboard,
} from "react-native";
import {
  ActivityIndicator,
  Dimensions,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  TextInputFocusEventData,
  TextInputProps,
  ViewStyle,
  TextInput as TextInputBaseComponent,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import {
  interpolate,
  interpolateColor,
  onChange,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "styled-components/native";
import { cepMask } from "../../../utils/mask/cep-mask";
import { cnpjMask } from "../../../utils/mask/cnpj-mask";
import { cpfMask } from "../../../utils/mask/cpf-mask";
import { CpfOrCnpjMask } from "../../../utils/mask/cpf-or-cnpj-mask";
import { phoneMask } from "../../../utils/mask/phone-mask";
import {
  Container,
  Input,
  ClearIcon,
  Placeholder,
  InputContainer,
  CustomErrorMessage,
  PlaceholderContainer,
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
    top: width * 0.15 * 0.3,
  },
};

type TypeConfig = {
  maxLength?: number;
  onChange: (value: string) => string;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
};

const inputConfigObject: { [key: string]: TypeConfig } = {
  cpf: {
    maxLength: 14,
    onChange: cpfMask,
    keyboardType: "number-pad",
    returnKeyType: "done",
  },
  cnpj: {
    maxLength: 18,
    onChange: cnpjMask,
    keyboardType: "number-pad",
    returnKeyType: "done",
  },
  cpfCnpj: {
    maxLength: 18,
    onChange: CpfOrCnpjMask,
    keyboardType: "number-pad",
    returnKeyType: "done",
  },
  cep: {
    maxLength: 9,
    onChange: cepMask,
    keyboardType: "number-pad",
    returnKeyType: "done",
  },
  phone: {
    maxLength: 15,
    onChange: phoneMask,
    keyboardType: "number-pad",
    returnKeyType: "done",
  },
};

type Props = TextInputProps & {
  name: string;
  control: any;
  mask?: keyof typeof inputConfigObject;
  defaultValue?: string;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  disableFloatingPlaceholder?: boolean;
  size?: "small" | "normal";
  onMaxLength?: (value: string) => void;
  onChange?: (value: string) => void;
};

export type TextInputRef = RnTextInput;

const INPUT_RANGE = [InputState.FOCUSED, InputState.UNFOCUSED];

export const TextInput = React.forwardRef(
  (
    {
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
      returnKeyType,
      onChange,
      ...props
    }: Props,
    componentRef: RefObject<TextInputRef>
  ) => {
    const ref = componentRef || useRef<TextInputBaseComponent>();

    const {
      field: { value, onChange: onTextChange },

      fieldState: { error },
    } = useController({ name, control, defaultValue });
    const theme = useTheme();

    const clearValue = () => onTextChange("");
    const state = useSharedValue(InputState.UNFOCUSED);

    const [isFocused, setIsFocused] = useState(!!state.value);

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (!disableFloatingPlaceholder) {
        state.value = withTiming(InputState.FOCUSED);
      }

      props.onFocus && props.onFocus(e);
      setIsFocused(true);
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (!disableFloatingPlaceholder) {
        state.value = withTiming(InputState.UNFOCUSED);
      }

      props.onBlur && props.onBlur(e);
      setIsFocused(false);
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
      };
    });

    const placeholderContainerStyles = useAnimatedStyle(() => {
      return {
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

    useEffect(() => {
      if (value && mask) {
        onTextChange(inputConfigObject[mask].onChange(value));
      }
    }, [mask, value]);

    useEffect(() => {
      const backhandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          ref?.current?.blur();
          alert("teste");
          return false;
        }
      );

      return backhandler.remove();
    }, []);

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
                  ref={ref}
                  error={!!error}
                  value={value}
                  returnKeyType={
                    returnKeyType ||
                    (mask ? inputConfigObject[mask].returnKeyType : "none")
                  }
                  blurOnSubmit
                  onChangeText={(value) => {
                    mask
                      ? onTextChange(inputConfigObject[mask].onChange(value))
                      : onTextChange(value);

                    onChange && onChange(value);

                    if (
                      onMaxLength &&
                      value.length === inputConfigObject[mask]?.maxLength
                    )
                      onMaxLength(value);
                  }}
                  maxLength={
                    props?.maxLength ||
                    inputConfigObject[mask]?.maxLength ||
                    100
                  }
                  autoComplete="off"
                  autoCapitalize="none"
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
                  <PlaceholderContainer
                    activeOpacity={1}
                    onPress={() => ref?.current?.focus()}
                    style={placeholderContainerStyles}
                  >
                    <Placeholder style={placeholderStyles}>
                      {placeholder}
                    </Placeholder>
                  </PlaceholderContainer>
                ) : null}
                {loading && (
                  <ActivityIndicator color={theme.color.text.primary} />
                )}
              </>
            )}
          />
          {value && !loading && isFocused && (
            <BorderlessButton onPress={clearValue}>
              <ClearIcon name="ios-close-circle-outline" />
            </BorderlessButton>
          )}
        </InputContainer>
        {error?.message ? (
          <CustomErrorMessage>{error.message}</CustomErrorMessage>
        ) : null}
      </Container>
    );
  }
);
