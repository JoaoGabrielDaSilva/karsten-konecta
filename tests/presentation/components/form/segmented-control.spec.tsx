import { faker } from "@faker-js/faker";
import {
  fireEvent,
  renderHook,
  RenderResult,
} from "@testing-library/react-native";

import React from "react";
import { useForm } from "react-hook-form";
import {
  SegmentedControl,
  SegmentedControlProps,
} from "../../../../src/presentation/components/form/segmented-control/segmented-control";

import { renderWithProviders } from "../../mocks/app.provider";

type SutTypes = {
  sut: RenderResult;
  data: Omit<SegmentedControlProps, "control">;
};

const mockOptions = () => [
  {
    label: faker.random.word(),
    value: faker.random.word(),
  },
  {
    label: faker.random.word(),
    value: faker.random.word(),
  },
];

type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> &
  Partial<Pick<Type, Key>>;

type SutParams = MakeOptional<SegmentedControlProps, "name" | "options">;

const mockProps = (
  name: string = faker.random.word()
): Omit<SegmentedControlProps, "control"> => ({
  name,
  label: faker.random.word(),
  testID: faker.random.word(),
  options: mockOptions(),
});

const makeSut = (props: SutParams): SutTypes => {
  const mockedProps = mockProps(props.name);

  const sut = renderWithProviders({
    Screen: () => <SegmentedControl {...mockedProps} {...props} />,
  });

  return {
    sut,
    data: mockedProps,
  };
};

describe("SegmentedControl", () => {
  it("should have the first option as default when defaultOption is null", () => {
    const name = faker.random.word();

    const mockedOptions = [
      {
        label: faker.random.word(),
        value: "0",
      },
      {
        label: faker.random.word(),
        value: "1",
      },
    ];

    const { result } = renderHook(() => useForm());

    const { sut, data } = makeSut({
      name,
      control: result.current.control,
      options: mockedOptions,
    });

    expect(sut.getByText(data.label));

    const selectedOption = sut.getByText(mockedOptions[0].label);

    expect(selectedOption.props.isSelected).toBe(true);
  });
  it("should have the correct default value", () => {
    const name = faker.random.word();

    const mockedOptions = [
      {
        label: faker.random.word(),
        value: "0",
      },
      {
        label: faker.random.word(),
        value: "1",
      },
    ];

    const { result } = renderHook(() => useForm());

    const { sut, data } = makeSut({
      name,
      control: result.current.control,
      options: mockedOptions,
      defaultValue: mockedOptions[1].value,
    });

    expect(sut.getByText(data.label));

    const selectedOption = sut.getByText(mockedOptions[1].label);

    fireEvent.press(selectedOption);

    expect(selectedOption.props.isSelected).toBe(true);
  });
  it("should have the correct value onPress", () => {
    const name = faker.random.word();

    const mockedOptions = [
      {
        label: faker.random.word(),
        value: "0",
      },
      {
        label: faker.random.word(),
        value: "1",
      },
    ];

    const { result } = renderHook(() => useForm());

    const { sut, data } = makeSut({
      name,
      control: result.current.control,
      options: mockedOptions,
    });

    expect(sut.getByText(data.label));

    const firstOption = sut.getByText(mockedOptions[0].label);
    const secondOption = sut.getByText(mockedOptions[1].label);

    fireEvent.press(secondOption);

    expect(secondOption.props.isSelected).toBe(true);
    expect(firstOption.props.isSelected).toBe(false);

    fireEvent.press(firstOption);

    expect(firstOption.props.isSelected).toBe(true);
    expect(secondOption.props.isSelected).toBe(false);
  });
  it("should call onChange on press", () => {
    const name = faker.random.word();
    const onChange = jest.fn();

    const mockedOptions = [
      {
        label: faker.random.word(),
        value: "0",
      },
      {
        label: faker.random.word(),
        value: "1",
      },
    ];

    const { result } = renderHook(() => useForm());

    const { sut, data } = makeSut({
      name,
      control: result.current.control,
      options: mockedOptions,
      onChange,
    });

    expect(sut.getByText(data.label));

    const secondOption = sut.getByText(mockedOptions[1].label);

    fireEvent.press(secondOption);

    expect(onChange).toHaveBeenCalledWith(mockedOptions[1].value);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
