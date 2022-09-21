import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import React, { RefObject, useEffect, useMemo, useRef, useState } from "react";
import { useImperativeHandle } from "react";
import { Control, Controller, useController } from "react-hook-form";
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  Pressable,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "styled-components/native";
import { BottomSheet, BottomSheetRef } from "../../bottom-sheet/bottom-sheet";

import { ListRow } from "../../list/list-row/list-row";
import {
  Container,
  Input,
  ClearIcon,
  Placeholder,
  InputContainer,
  CustomErrorMessage,
  Value,
} from "./styles";

const { width } = Dimensions.get("window");

enum InputState {
  CLOSED,
  OPEN,
}
enum FocusState {
  UNFOCUSED,
  FOCUSED,
}

const PLACEHOLDER_POSITIONS = {
  [InputState.OPEN]: {
    left: 10,
    top: 0,
  },
  [InputState.CLOSED]: {
    left: 20,
    top: width * 0.15 * 0.35,
  },
};

type Options = {
  label: string;
  value: string | number;
};

type Props = {
  name: string;
  options: Options[];
  control: Control<any>;
  defaultValue?: string;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  editable?: boolean;
};

export type SelectInputRef = {
  focus?: () => void;
};

const INPUT_RANGE = [InputState.OPEN, InputState.CLOSED];

export const SelectInput = React.forwardRef(
  (
    {
      name,
      defaultValue = "",
      control,
      style,
      loading,
      disabled,
      placeholder,
      options,
      editable = true,
      ...props
    }: Props,
    ref: RefObject<SelectInputRef>
  ) => {
    const {
      field: { value, onChange },

      fieldState: { error },
    } = useController({ name, control, defaultValue });
    const theme = useTheme();

    const state = useSharedValue(InputState.CLOSED);
    const focus = useSharedValue(FocusState.UNFOCUSED);

    const label = useMemo(
      () => options.find((option) => option.value === value)?.label,
      [value]
    );

    const bottomSheetRef = useRef<BottomSheetRef>();

    const clearValue = () => {
      onChange("");
    };

    const openModal = () => {
      onFocus();
      bottomSheetRef?.current?.open();
    };

    const closeModal = () => {
      bottomSheetRef?.current?.close();
    };

    const onFocus = () => {
      state.value = withTiming(InputState.OPEN);
      focus.value = withTiming(FocusState.FOCUSED);
    };

    const onBlur = () => {
      closeModal();

      focus.value = withTiming(FocusState.UNFOCUSED);
      if (value === undefined || value === "" || !label) {
        state.value = withTiming(InputState.CLOSED);
      }
    };

    const containerStyles = useAnimatedStyle(() => {
      return {
        borderColor: !error
          ? interpolateColor(
              focus.value,
              [FocusState.FOCUSED, FocusState.UNFOCUSED],
              [
                theme.color.background.emphasis,
                theme.color.background.secondary,
              ]
            )
          : theme.color.red[500],
      };
    });
    const placeholderStyles = useAnimatedStyle(() => {
      const isValid = (!!value || value === 0) && label;

      return {
        fontSize: isValid
          ? 12
          : interpolate(state.value, INPUT_RANGE, [12, 15]),
        color: !error
          ? interpolateColor(state.value, INPUT_RANGE, [
              theme.color.text.primary,
              theme.color.text.secondary,
            ])
          : theme.color.red[500],
        top: !isValid
          ? interpolate(state.value, INPUT_RANGE, [
              PLACEHOLDER_POSITIONS[InputState.OPEN].top,
              PLACEHOLDER_POSITIONS[InputState.CLOSED].top,
            ])
          : PLACEHOLDER_POSITIONS[InputState.OPEN].top,
        left: !isValid
          ? interpolate(state.value, INPUT_RANGE, [
              PLACEHOLDER_POSITIONS[InputState.OPEN].left,
              PLACEHOLDER_POSITIONS[InputState.CLOSED].left,
            ])
          : PLACEHOLDER_POSITIONS[InputState.OPEN].left,
      };
    });

    useImperativeHandle(ref, () => ({
      focus: openModal,
    }));

    useEffect(() => {
      onBlur();
    }, [value]);

    return (
      <>
        <Container style={style}>
          <Pressable disabled={loading || disabled} onPress={openModal}>
            <InputContainer
              style={[containerStyles]}
              align="center"
              editable={!disabled && !loading && editable}
            >
              <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={() => (
                  <>
                    <Input align="center" justify="space-between" {...props}>
                      {label ? <Value>{String(label)}</Value> : null}
                      {loading && (
                        <ActivityIndicator color={theme.color.text.primary} />
                      )}
                      {!!String(value) && !loading && label && (
                        <ClearIcon
                          name="ios-close-circle-outline"
                          onPress={clearValue}
                        />
                      )}
                    </Input>
                    {placeholder ? (
                      <Placeholder style={placeholderStyles}>
                        {placeholder}
                      </Placeholder>
                    ) : null}
                  </>
                )}
              />
            </InputContainer>
          </Pressable>

          {error?.message ? (
            <CustomErrorMessage>{error.message}</CustomErrorMessage>
          ) : null}
        </Container>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={options?.length > 5 ? ["95%"] : ["50%", "95%"]}
          onClose={onBlur}
        >
          <BottomSheetFlatList
            data={options}
            contentContainerStyle={{
              marginHorizontal: theme.spacing.lg,
            }}
            renderItem={({ item }) => (
              <RectButton
                onPress={() => {
                  if (value === item.value) {
                    closeModal();
                    onBlur();
                  }
                  onChange(item.value);
                }}
              >
                <ListRow
                  label={String(item.label)}
                  rightIcon={item.value === value ? "check" : null}
                />
              </RectButton>
            )}
          />
        </BottomSheet>
      </>
    );
  }
);
