import { faker } from "@faker-js/faker";
import {
  act,
  fireEvent,
  renderHook,
  RenderResult,
  waitFor,
} from "@testing-library/react-native";

import React from "react";
import { Image, Pressable } from "react-native";
import {
  AttendanceListProduct,
  AttendanceListProductProps,
} from "../../../../src/presentation/components/list/attendance-list-product/attendance-list-product";

import { renderWithProviders } from "../../__mocks__/app.provider";

type SutTypes = {
  sut: RenderResult;
  data: AttendanceListProductProps;
};

type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> &
  Partial<Pick<Type, Key>>;

type SutParams = Partial<AttendanceListProductProps>;

const mockProps = (): AttendanceListProductProps => ({
  name: faker.commerce.productName(),
  code: faker.random.numeric(6),
  ean: faker.random.numeric(11),
  id: faker.random.numeric(4),
  uri: faker.internet.url(),
  totalPrice: parseFloat(String(Math.random() * 1000)),
  totalWeight: parseFloat(String(Math.random() * 100)),
});

const makeSut = (props?: SutParams): SutTypes => {
  const mockedProps = mockProps();

  const sut = renderWithProviders({
    Screen: () => <AttendanceListProduct {...mockedProps} {...props} />,
  });

  return {
    sut,
    data: mockedProps,
  };
};

describe("AttendanceListProduct", () => {
  it("should have correct initial data", () => {
    const { sut, data } = makeSut();

    expect(sut.getByText(data.name));
    expect(sut.getByText(data.code));
    expect(sut.getByText(data.ean));
    expect(sut.getByText(data.name));

    expect(sut.UNSAFE_queryByType(Image));
  });
  it("should call update product amount with sum param true", async () => {
    const initialAmount = Math.floor(Math.random() * 10);
    const onUpdateAmount = jest.fn();

    const { sut, data } = makeSut({
      onUpdateAmount,
    });

    await waitFor(async () => {
      fireEvent.press(sut.getByText("+"));
    });

    expect(onUpdateAmount).toHaveBeenCalledTimes(1);
    expect(onUpdateAmount).toHaveBeenCalledWith({ id: data.id, sum: true });
  });
  it("should call update product amount with sum param false", async () => {
    const onUpdateAmount = jest.fn();

    const { sut, data } = makeSut({
      onUpdateAmount,
    });

    await waitFor(async () => {
      fireEvent.press(sut.getByText("-"));
    });

    expect(onUpdateAmount).toHaveBeenCalledTimes(1);
    expect(onUpdateAmount).toHaveBeenCalledWith({ id: data.id, sum: false });
  });
  it("should call on press when pressing product cart", async () => {
    const onPress = jest.fn();

    const { sut } = makeSut({
      onPress,
    });

    await waitFor(async () => {
      fireEvent.press(sut.UNSAFE_getByType(Pressable));
    });

    expect(onPress).toHaveBeenCalledTimes(1);
  });
  it("should call on delete ", async () => {
    const onDelete = jest.fn();

    const { sut, data } = makeSut({
      onDelete,
    });

    await waitFor(async () => {
      fireEvent.press(sut.getByText(/excluir item/i));
    });

    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith({ id: data.id });
  });
});
