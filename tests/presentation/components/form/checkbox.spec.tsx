import { faker } from "@faker-js/faker";
import {
  fireEvent,
  renderHook,
  RenderResult,
  waitFor,
} from "@testing-library/react-native";
import React from "react";
import { Control, useForm } from "react-hook-form";
import { Dimensions } from "react-native";

import {
  Checkbox,
  CheckboxProps,
} from "../../../../src/presentation/components/form/checkbox/checkbox";

import { renderWithProviders } from "../../__mocks__/app.provider";

type SutTypes = {
  sut: RenderResult;
  data: Omit<CheckboxProps, "control">;
};

type SutParams = {
  control: Control<any, any>;
  name?: string;
  disabled?: boolean;
};

const mockProps = (name: string): Omit<CheckboxProps, "control"> => ({
  name,
  label: faker.random.word(),
  testID: faker.random.numeric(),
});

const makeSut = ({
  control,
  name = faker.random.word(),
  disabled,
}: SutParams): SutTypes => {
  const mockedProps = mockProps(name);

  const sut = renderWithProviders({
    Screen: () => (
      <Checkbox control={control} disabled={disabled} {...mockedProps} />
    ),
  });

  return {
    sut,
    data: mockedProps,
  };
};

describe("FilterTag", () => {
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

    const { sut } = makeSut({ name, control: result.current.control });

    expect(
      sut.UNSAFE_queryByProps({
        active: initialValue,
      })
    ).toBeFalsy();
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

    const { sut } = makeSut({ name, control: result.current.control });

    sut.UNSAFE_getByProps({
      active: initialValue,
    });
  });

  it("should toggle on press when is not disabled", async () => {
    const name = faker.random.word();

    const { result } = renderHook(() => useForm());

    const { sut, data } = makeSut({ name, control: result.current.control });

    expect(
      sut.UNSAFE_queryByProps({
        active: false,
      })
    ).toBeFalsy();

    const checkbox = sut.getByTestId(data.testID);

    fireEvent.press(checkbox);

    sut.UNSAFE_getByProps({
      name: "check",
    });
    sut.UNSAFE_getByProps({
      active: true,
    });

    fireEvent.press(checkbox);

    expect(
      sut.UNSAFE_queryByProps({
        active: false,
      })
    ).toBeFalsy();
  });
  it("should toggle on press when disabled", async () => {
    const name = faker.random.word();

    const { result } = renderHook(() => useForm());

    const { sut, data } = makeSut({
      name,
      disabled: true,
      control: result.current.control,
    });

    fireEvent.press(sut.getByTestId(data.testID));

    expect(
      sut.UNSAFE_queryByProps({
        active: false,
      })
    ).toBeFalsy();
  });
});
