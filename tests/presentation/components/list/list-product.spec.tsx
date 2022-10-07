import { faker } from "@faker-js/faker";
import {
  act,
  fireEvent,
  renderHook,
  RenderResult,
  waitFor,
} from "@testing-library/react-native";

import React from "react";
import { Image } from "react-native";
import {
  ListProduct,
  ListProductProps,
} from "../../../../src/presentation/components/list/list-product/list-product";

import { renderWithProviders } from "../../mocks/app.provider";

type SutTypes = {
  sut: RenderResult;
  data: ListProductProps;
};

type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> &
  Partial<Pick<Type, Key>>;

type SutParams = Partial<ListProductProps>;

const mockProps = (): ListProductProps => ({
  name: faker.commerce.productName(),
  code: faker.random.numeric(6),
  ean: faker.random.numeric(11),
  uri: faker.internet.url(),
  testID: faker.random.word(),
});

const makeSut = (props?: SutParams): SutTypes => {
  const mockedProps = mockProps();

  const sut = renderWithProviders({
    Screen: () => <ListProduct {...mockedProps} {...props} />,
  });

  return {
    sut,
    data: mockedProps,
  };
};

describe("ListProduct", () => {
  it("should have correct initial data", () => {
    const amount = Math.floor(Math.random() * 99);

    const { sut, data } = makeSut({
      amount,
    });

    expect(sut.getByText(data.name));
    expect(sut.getByText(data.code));
    expect(sut.getByText(data.ean));
    expect(sut.getByText(data.name));

    expect(sut.getByText(String(amount)));

    expect(sut.getByTestId(data.testID).props.style).not.toHaveProperty(
      "borderBottomColor",
      "transparent"
    );

    expect(sut.UNSAFE_queryByType(Image));
  });
  it("should not have bottom border if borderless", () => {
    const { sut, data } = makeSut({
      borderless: true,
    });

    expect(sut.getByTestId(data.testID).props.style).toHaveProperty(
      "borderBottomColor",
      "transparent"
    );
  });
  it("should show amount as '+99' if amount is >= 100", () => {
    const amount = Math.floor(Math.random() * (200 - 100 + 1)) + 100;

    const { sut } = makeSut({
      amount,
    });

    expect(sut.getByText("+99"));
  });
  it("should not show amount if amount is null", () => {
    const { sut, data } = makeSut();

    expect(sut.queryByTestId(`${data.testID}-amount`)).toBeFalsy();
  });
});
