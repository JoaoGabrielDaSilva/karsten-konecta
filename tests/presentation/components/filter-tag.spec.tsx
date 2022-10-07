import { faker } from "@faker-js/faker";
import { fireEvent, RenderResult } from "@testing-library/react-native";
import React from "react";
import { Dimensions } from "react-native";

import {
  FilterTag,
  FilterTagProps,
} from "../../../src/presentation/components/filter-tag/filter-tag";

import { renderWithProviders } from "../mocks/app.provider";

type SutTypes = {
  sut: RenderResult;
  data: FilterTagProps;
};

const mockProps = (): FilterTagProps => ({
  label: faker.random.word(),
  value: faker.random.word(),
  apiValue: faker.random.word(),
  filterKey: faker.random.word(),
});

const makeSut = (props?: Partial<FilterTagProps>): SutTypes => {
  const mockedProps = mockProps();

  const sut = renderWithProviders({
    Screen: () => <FilterTag {...mockedProps} {...props} />,
  });

  return {
    sut,
    data: mockedProps,
  };
};

describe("FilterTag", () => {
  it("should show correct values", async () => {
    const { sut, data } = makeSut();

    sut.getByText(`${data.label}: `);
    sut.getByText(data.value);
    sut.UNSAFE_getByProps({
      name: "close",
    });
  });
  it("should not show remove icon if hideRemove is set to true", async () => {
    const { sut, data } = makeSut({
      hideRemove: true,
    });

    sut.getByText(`${data.label}: `);
    sut.getByText(data.value);
    expect(
      sut.UNSAFE_queryByProps({
        name: "close",
      })
    ).toBeFalsy();
  });
  it("should call remove filter function when remove icon is pressed", async () => {
    const handleRemove = jest.fn();

    const { sut, data } = makeSut({
      handleRemove,
    });

    sut.getByText(`${data.label}: `);
    sut.getByText(data.value);

    fireEvent.press(
      sut.UNSAFE_queryByProps({
        name: "close",
      })
    );

    expect(handleRemove).toHaveBeenCalledTimes(1);
    expect(handleRemove).toHaveBeenCalledWith({ key: data.filterKey });
  });
});
