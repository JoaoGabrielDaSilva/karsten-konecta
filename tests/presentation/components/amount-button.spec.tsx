import { faker } from "@faker-js/faker";
import {
  fireEvent,
  RenderResult,
  waitFor,
} from "@testing-library/react-native";
import {
  AmountButton,
  AmountButtonProps,
} from "../../../src/presentation/components/buttons/amount-button/amount-button";

import { renderWithProviders } from "../mocks/app.provider";

type SutTypes = {
  sut: RenderResult;
};

const makeSut = (props: AmountButtonProps): SutTypes => {
  const sut = renderWithProviders({
    Screen: () => <AmountButton {...props} />,
  });

  return {
    sut,
  };
};

describe("AmountButton", () => {
  it("should show the correct amount", async () => {
    const amount = Math.random() * 10;

    const { sut } = makeSut({
      amount,
      onDecrease: jest.fn(),
      onIncrease: jest.fn(),
    });

    await sut.findByText(`${amount}`);
  });
  it("should not call onIncrease and onDecrease when disabled", async () => {
    const id = faker.random.numeric();
    const amount = Math.random() * 10 + 1;

    const onIncrease = jest.fn();
    const onDecrease = jest.fn();

    const { sut } = makeSut({
      amount,
      onDecrease,
      onIncrease,
      disabled: true,
      testID: id,
    });

    fireEvent.press(sut.getByTestId(`${id}-increase`));
    fireEvent.press(sut.getByTestId(`${id}-decrease`));

    expect(onIncrease).not.toBeCalled();
    expect(onDecrease).not.toBeCalled();
  });
  it("should not increase its amount when amount is equal to max amount", async () => {
    const id = faker.random.numeric();
    const amount = Math.random() * 10 + 1;

    const onIncrease = jest.fn();

    const { sut } = makeSut({
      amount,
      maxAmount: amount,
      onDecrease: jest.fn(),
      onIncrease,
      testID: id,
    });

    fireEvent.press(sut.getByTestId(`${id}-increase`));

    expect(onIncrease).not.toBeCalled();
  });
  it("should not decrease its amount when amount is equal to 1", async () => {
    const id = faker.random.numeric();
    const amount = 1;

    const onDecrease = jest.fn();

    const { sut } = makeSut({
      amount,
      onDecrease,
      onIncrease: jest.fn(),
      testID: id,
    });

    fireEvent.press(sut.getByTestId(`${id}-decrease`));

    expect(onDecrease).not.toBeCalled();
  });
});
