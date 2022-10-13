import { faker } from "@faker-js/faker";
import { fireEvent, render, RenderResult } from "@testing-library/react-native";
import {
  Button,
  ButtonProps,
} from "../../../src/presentation/components/buttons/button/button";
import { renderWithProviders } from "../__mocks__/app.provider";

type SutTypes = {
  sut: RenderResult;
};

const makeSut = (props: ButtonProps): SutTypes => {
  const sut = renderWithProviders({
    Screen: () => <Button {...props} />,
  });

  return {
    sut,
  };
};

describe("Button", () => {
  it("should have the correct text value", async () => {
    const buttonText = faker.random.word();

    const { sut } = makeSut({ text: buttonText, onPress: () => {} });

    await sut.findByText(buttonText);
  });
  it("should show loader and be disabled when loading is true", async () => {
    const id = faker.random.numeric(4);

    const { sut } = makeSut({
      text: "",
      onPress: () => {},
      loading: true,
      testID: id,
    });

    expect(sut.getByTestId(id).props.accessibilityState.disabled).toBe(true);
    await sut.findByTestId(`${id}-loader`);
  });
  it("should call on press function when not disabled", async () => {
    const buttonText = faker.random.word();
    const onPress = jest.fn();

    const { sut } = makeSut({ text: buttonText, onPress });

    fireEvent.press(sut.getByText(buttonText));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
  it("should not call on press function when disabled ", async () => {
    const id = faker.random.numeric(4);

    const onPress = jest.fn();

    const { sut } = makeSut({ testID: id, text: "", onPress, disabled: true });

    fireEvent.press(sut.getByTestId(id));

    expect(onPress).toHaveBeenCalledTimes(0);
  });
  it("should not call on press function when loading ", async () => {
    const id = faker.random.numeric(4);

    const onPress = jest.fn();

    const { sut } = makeSut({ testID: id, text: "", onPress, loading: true });

    fireEvent.press(sut.getByTestId(id));

    expect(onPress).toHaveBeenCalledTimes(0);
  });
});
