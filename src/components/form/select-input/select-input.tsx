import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import React, { useEffect, useMemo, useRef, useState } from "react";
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
};

const INPUT_RANGE = [InputState.OPEN, InputState.CLOSED];

export const SelectInput = ({
  name,
  defaultValue = "",
  control,
  style,
  loading,
  disabled,
  placeholder,
  options,
  ...props
}: Props) => {
  const {
    field: { value, onChange },

    fieldState: { error },
  } = useController({ name, control, defaultValue });
  const theme = useTheme();

  const [visible, setVisible] = useState(false);

  const state = useSharedValue(InputState.CLOSED);
  const focus = useSharedValue(FocusState.UNFOCUSED);

  const label = useMemo(
    () => options.find((option) => option.value === value)?.label,
    [value]
  );

  const bottomSheetRef = useRef<BottomSheet>();

  const clearValue = () => {
    onChange("");
  };

  const openModal = () => {
    onFocus();
    setVisible(true);
    bottomSheetRef?.current?.expand();
  };

  const closeModal = () => {
    bottomSheetRef?.current?.close();
    setTimeout(() => setVisible(false), 250);
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
            [theme.color.background.emphasis, theme.color.background.secondary]
          )
        : theme.color.red[500],
    };
  });
  const placeholderStyles = useAnimatedStyle(() => {
    const isValid = (!!value || value === 0) && label;

    return {
      fontSize: isValid ? 12 : interpolate(state.value, INPUT_RANGE, [12, 15]),
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
            editable={!disabled && !loading}
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
      <Modal transparent visible={visible}>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={["25%", "50%", "95%"]}
          detached
          enablePanDownToClose
          onClose={onBlur}
          backdropComponent={() => (
            <TouchableOpacity
              activeOpacity={1}
              style={{ flex: 1, backgroundColor: "#222222A1" }}
              onPress={onBlur}
            />
          )}
        >
          <BottomSheetFlatList
            data={options}
            contentContainerStyle={{
              marginHorizontal: theme.spacing.lg,
            }}
            renderItem={({ item }) => (
              <RectButton
                onPress={() => {
                  if (value === item.value) return closeModal();
                  onChange(item.value);
                }}
              >
                <ListRow label={String(item.label)} />
              </RectButton>
            )}
          />
        </BottomSheet>
      </Modal>
    </>
  );
};
