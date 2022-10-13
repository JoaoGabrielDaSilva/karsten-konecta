import { faker } from "@faker-js/faker";
import { fireEvent, RenderResult } from "@testing-library/react-native";
import {
  RadioButton,
  RadioButtonProps,
} from "../../../src/presentation/components/buttons/radio-button/radio-button";

import { renderWithProviders } from "../__mocks__/app.provider";

type SutTypes = {
  sut: RenderResult;
};

const makeSut = (props: RadioButtonProps): SutTypes => {
  const sut = renderWithProviders({
    Screen: () => <RadioButton {...props} />,
  });

  return {
    sut,
  };
};

describe("RadioButton", () => {
  it("should have the correct label", async () => {
    const label = faker.random.word();

    const { sut } = makeSut({ label });

    await sut.findByText(label);
  });
  it("should be filled when active is true", async () => {
    const id = faker.random.word();
    const label = faker.random.word();

    const { sut } = makeSut({ label, active: true, testID: id });

    await sut.findByTestId(`${id}-fill`);
  });
  it("should call on press function when not disabled", async () => {
    const label = faker.random.word();
    const onPress = jest.fn();

    const { sut } = makeSut({ label, onPress });

    fireEvent.press(sut.getByText(label));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
  it("should not call on press function when disabled ", async () => {
    const id = faker.random.numeric(4);

    const onPress = jest.fn();

    const { sut } = makeSut({ testID: id, label: "", onPress, disabled: true });

    fireEvent.press(sut.getByTestId(id));

    expect(onPress).toHaveBeenCalledTimes(0);
  });
});
