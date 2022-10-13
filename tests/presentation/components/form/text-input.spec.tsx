import { faker } from "@faker-js/faker";
import {
  fireEvent,
  renderHook,
  RenderResult,
} from "@testing-library/react-native";
import {
  withReanimatedTimer,
  advanceAnimationByTime,
} from "react-native-reanimated/src/reanimated2/jestUtils";

import React from "react";
import { useForm } from "react-hook-form";
import {
  TextInput,
  textInputConfigObject,
  TextInputProps,
} from "../../../../src/presentation/components/form/text-input/text-input";

import { renderWithProviders } from "../../__mocks__/app.provider";

type SutTypes = {
  sut: RenderResult;
  data: Omit<TextInputProps, "control">;
};

type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> &
  Partial<Pick<Type, Key>>;

type SutParams = MakeOptional<TextInputProps, "name">;

const mockProps = (
  name: string = faker.random.word()
): Omit<TextInputProps, "control"> => ({
  name,
  placeholder: faker.random.word(),
  testID: "input",
});

const makeSut = (props: SutParams): SutTypes => {
  const mockedProps = mockProps(props.name);

  const sut = renderWithProviders({
    Screen: () => <TextInput {...props} {...mockedProps} />,
  });

  return {
    sut,
    data: mockedProps,
  };
};

describe("TextInput", () => {
  it("should have the correct value", () => {
    const name = faker.random.word();
    const text = faker.random.words();

    const { result } = renderHook(() => useForm());

    const { sut, data } = makeSut({ name, control: result.current.control });

    const textInput = sut.getByTestId(`${data.testID}`);

    fireEvent.changeText(textInput, text);

    expect(textInput.props.value).toBe(text);
  });
  it("should have the correct default value", () => {
    const name = faker.random.word();
    const text = faker.random.words();

    const { result } = renderHook(() =>
      useForm({
        defaultValues: {
          [name]: text,
        },
      })
    );

    const { sut, data } = makeSut({ name, control: result.current.control });

    expect(sut.getByTestId(`${data.testID}`).props.value).toBe(text);
  });
  it("should have the correct cpf mask config and value", () => {
    const name = faker.random.word();
    const text = faker.random.numeric(11);
    const mask: keyof typeof textInputConfigObject = "cpf";
    const config = textInputConfigObject[mask];

    const { result } = renderHook(() => useForm());

    const { sut, data } = makeSut({
      name,
      mask,
      control: result.current.control,
    });

    const textInput = sut.getByTestId(`${data.testID}`);

    fireEvent.changeText(textInput, text);

    expect(textInput.props.value).toBe(config.onChange(text));
    expect(textInput.props.maxLength).toBe(config.maxLength);
    expect(textInput.props.keyboardType).toBe(config.keyboardType);
    expect(textInput.props.returnKeyType).toBe(config.returnKeyType);
  });
  it("should have the correct cnpj mask config and value", () => {
    const name = faker.random.word();
    const text = faker.random.numeric(14);
    const mask: keyof typeof textInputConfigObject = "cnpj";
    const config = textInputConfigObject[mask];

    const { result } = renderHook(() => useForm());

    const { sut, data } = makeSut({
      name,
      mask,
      control: result.current.control,
    });

    const textInput = sut.getByTestId(`${data.testID}`);

    fireEvent.changeText(textInput, text);

    expect(textInput.props.value).toBe(config.onChange(text));
    expect(textInput.props.maxLength).toBe(config.maxLength);
    expect(textInput.props.keyboardType).toBe(config.keyboardType);
    expect(textInput.props.returnKeyType).toBe(config.returnKeyType);
  });
  it("should have the correct cpfCnpj mask config and value", () => {
    const name = faker.random.word();
    const cpfPart = faker.random.numeric(11);
    const cnpjPart = faker.random.numeric(18);

    const mask: keyof typeof textInputConfigObject = "cpfCnpj";
    const config = textInputConfigObject[mask];

    const { result } = renderHook(() => useForm());

    const { sut, data } = makeSut({
      name,
      mask,
      control: result.current.control,
    });

    const textInput = sut.getByTestId(`${data.testID}`);

    fireEvent.changeText(textInput, cpfPart);
    expect(textInput.props.value).toBe(config.onChange(cpfPart));
    fireEvent.changeText(textInput, cnpjPart);

    expect(textInput.props.value).toBe(config.onChange(cnpjPart));

    expect(textInput.props.maxLength).toBe(config.maxLength);
    expect(textInput.props.keyboardType).toBe(config.keyboardType);
    expect(textInput.props.returnKeyType).toBe(config.returnKeyType);
  });
  it("should have the correct cep mask config and value", () => {
    const name = faker.random.word();
    const text = faker.random.numeric(8);
    const mask: keyof typeof textInputConfigObject = "cep";
    const config = textInputConfigObject[mask];

    const { result } = renderHook(() => useForm());

    const { sut, data } = makeSut({
      name,
      mask,
      control: result.current.control,
    });

    const textInput = sut.getByTestId(`${data.testID}`);

    fireEvent.changeText(textInput, text);

    expect(textInput.props.value).toBe(config.onChange(text));
    expect(textInput.props.maxLength).toBe(config.maxLength);
    expect(textInput.props.keyboardType).toBe(config.keyboardType);
    expect(textInput.props.returnKeyType).toBe(config.returnKeyType);
  });
  it("should have the correct phone mask config and value", () => {
    const name = faker.random.word();
    const text = faker.random.numeric(11);
    const mask: keyof typeof textInputConfigObject = "phone";
    const config = textInputConfigObject[mask];

    const { result } = renderHook(() => useForm());

    const { sut, data } = makeSut({
      name,
      mask,
      control: result.current.control,
    });

    const textInput = sut.getByTestId(`${data.testID}`);

    fireEvent.changeText(textInput, text);

    expect(textInput.props.value).toBe(config.onChange(text));
    expect(textInput.props.maxLength).toBe(config.maxLength);
    expect(textInput.props.keyboardType).toBe(config.keyboardType);
    expect(textInput.props.returnKeyType).toBe(config.returnKeyType);
  });
  it("should have the correct error message", () => {
    const name = faker.random.word();
    const error = faker.random.words();

    const { result } = renderHook(() => useForm());

    result.current.setError(name, { message: error });
    const { sut, data } = makeSut({
      name,
      control: result.current.control,
    });
    expect(sut.getByTestId(`${data.testID}`).props.error).toBe(true);
    sut.getByText(error);
  });
  it("should show loader when loading is true ", () => {
    const onFocus = jest.fn();

    const { result } = renderHook(() => useForm());

    const { sut, data } = makeSut({
      control: result.current.control,
      onFocus,
      loading: true,
    });

    sut.getByTestId(`${data.testID}-loader`);
  });
  it("should show clear button when is focused only", async () => {
    const name = faker.random.word();

    const { result } = renderHook(() =>
      useForm({
        defaultValues: {
          [name]: faker.random.word(),
        },
      })
    );

    const { sut, data } = makeSut({
      name,
      control: result.current.control,
    });

    fireEvent(sut.getByTestId(data.testID), "focus");

    await sut.findByTestId(`${data.testID}-clear`, {});
  });
  it("should clear text value when clear button is pressed", async () => {
    const name = faker.random.word();
    const text = faker.random.word();

    const onFocus = jest.fn();

    const { result } = renderHook(() =>
      useForm({
        defaultValues: {
          [name]: text,
        },
      })
    );

    const { sut, data } = makeSut({
      name,
      control: result.current.control,
      onFocus,
    });

    const input = sut.getByTestId(data.testID);

    fireEvent(input, "focus");
    expect(onFocus).toHaveBeenCalledTimes(1);

    const clearButton = await sut.findByTestId(`${data.testID}-clear`, {});

    expect(input.props.value).toBe(text);

    fireEvent.press(clearButton);

    expect(input.props.value).toBe("");
  });
});
