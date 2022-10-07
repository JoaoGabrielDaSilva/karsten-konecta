import { faker } from "@faker-js/faker";
import { fireEvent, RenderResult } from "@testing-library/react-native";

import React from "react";
import { Image } from "react-native";
import {
  ListRow,
  ListRowProps,
} from "../../../../src/presentation/components/list/list-row/list-row";

import { renderWithProviders } from "../../mocks/app.provider";

type SutTypes = {
  sut: RenderResult;
  data: ListRowProps;
};

type SutParams = Partial<ListRowProps>;

const mockProps = (): ListRowProps => ({
  label: faker.random.word(),
  value: faker.random.word(),
  testID: faker.random.word(),
});

const makeSut = (props?: SutParams): SutTypes => {
  const mockedProps = mockProps();

  const sut = renderWithProviders({
    Screen: () => <ListRow {...mockedProps} {...props} />,
  });

  return {
    sut,
    data: mockedProps,
  };
};

describe("ListRow", () => {
  it("should have correct label and value", () => {
    const { sut, data } = makeSut();

    sut.getByText(data.label);
    sut.getByText(data.value);
  });
  it("should show left icon", () => {
    const leftIcon = "arrow-drop-down";

    const { sut, data } = makeSut({
      leftIcon,
    });

    sut.getByText(data.label);
    sut.getByText(data.value);
    sut.UNSAFE_getByProps({
      name: leftIcon,
    });
  });
  it("should show right icon", () => {
    const rightIcon = "arrow-drop-down";

    const { sut, data } = makeSut({
      rightIcon,
    });

    sut.getByText(data.label);
    sut.getByText(data.value);
    sut.UNSAFE_getByProps({
      name: rightIcon,
    });
  });
  it("should call on press", () => {
    const onPress = jest.fn();

    const { sut, data } = makeSut({
      onPress,
    });

    fireEvent.press(sut.getByTestId(data.testID));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
