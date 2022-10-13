import { faker } from "@faker-js/faker";
import {
  fireEvent,
  renderHook,
  RenderResult,
} from "@testing-library/react-native";
import React from "react";
import { Control, useForm } from "react-hook-form";

import {
  FormRadioButton,
  FormRadioButtonProps,
} from "../../../../src/presentation/components/form/radio-button/radio-button";

import { renderWithProviders } from "../../__mocks__/app.provider";

type SutTypes = {
  sut: RenderResult;
  data: Omit<FormRadioButtonProps, "control">;
};

type SutParams = {
  control: Control<any, any>;
  name?: string;
  disabled?: boolean;
  onPress?: () => void;
};

const mockProps = (name: string): Omit<FormRadioButtonProps, "control"> => ({
  name,
  label: faker.random.word(),
  testID: faker.random.numeric(),
});

const makeSut = ({
  control,
  name = faker.random.word(),
  disabled,
  onPress,
}: SutParams): SutTypes => {
  const mockedProps = mockProps(name);

  const sut = renderWithProviders({
    Screen: () => (
      <FormRadioButton
        control={control}
        onPress={onPress}
        disabled={disabled}
        {...mockedProps}
      />
    ),
  });

  return {
    sut,
    data: mockedProps,
  };
};

describe("RadioButton", () => {
  it("should show correct values", async () => {
    const { result } = renderHook(() => useForm());

    const { sut, data } = makeSut({ control: result.current.control });

    sut.getByText(data.label);
  });
  it("should start with false value", async () => {
    const initialValue = false;
    const name = faker.random.word();

    const { result } = renderHook(() =>
      useForm({
        defaultValues: {
          [name]: initialValue,
        },
      })
    );

    const { sut, data } = makeSut({ name, control: result.current.control });

    expect(sut.queryByTestId(`${data.testID}-fill`)).toBeFalsy();
  });
  it("should start with true value", async () => {
    const initialValue = true;
    const name = faker.random.word();

    const { result } = renderHook(() =>
      useForm({
        defaultValues: {
          [name]: initialValue,
        },
      })
    );

    const { sut, data } = makeSut({ name, control: result.current.control });

    sut.getByTestId(`${data.testID}-fill`);
  });

  it("should select when is not disabled", async () => {
    const name = faker.random.word();

    const { result } = renderHook(() => useForm());

    const { sut, data } = makeSut({ name, control: result.current.control });

    expect(sut.queryByTestId(`${data.testID}-fill`)).toBeFalsy();

    fireEvent.press(sut.getByTestId(data.testID));

    sut.getByTestId(`${data.testID}-fill`);
  });
  it("should call onPress callback when it exists", async () => {
    const onPress = jest.fn();

    const { result } = renderHook(() => useForm());

    const { sut, data } = makeSut({
      disabled: true,
      onPress,
      control: result.current.control,
    });

    fireEvent.press(sut.getByTestId(data.testID));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
