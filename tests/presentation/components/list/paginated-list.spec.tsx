import { faker } from "@faker-js/faker";
import { fireEvent, RenderResult } from "@testing-library/react-native";

import React from "react";
import { Image, Text } from "react-native";
import {
  PaginatedList,
  PaginatedListProps,
} from "../../../../src/presentation/components/list/paginated-list/paginated-list";
import { Skeleton } from "../../../../src/presentation/components/skeleton/skeleton";

import { Filter } from "../../../../src/presentation/models/filter-model";

import { renderWithProviders } from "../../mocks/app.provider";

type SutTypes = {
  sut: RenderResult;
};

type SutParams = PaginatedListProps;

const mockScrollEvent = ({ scrollY = 0, scrollX = 0 }) => ({
  nativeEvent: {
    contentOffset: {
      y: scrollY,
      x: scrollX,
    },
    contentSize: {
      height: 500,
      width: 100,
    },
    layoutMeasurement: {
      height: 100,
      width: 100,
    },
  },
});

const makeSut = (props: SutParams): SutTypes => {
  const sut = renderWithProviders({
    Screen: () => <PaginatedList {...props} />,
  });

  return {
    sut,
  };
};

describe("ListRow", () => {
  it("should show loader", () => {
    const data = [
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
    ];

    const onEndReached = jest.fn();
    const testID = faker.random.word();

    const { sut } = makeSut({
      data,
      renderItem: ({ item }) => <Text>{item}</Text>,
      onEndReached,
      testID,
    });

    fireEvent.scroll(
      sut.getByTestId(testID),
      mockScrollEvent({ scrollY: 500 })
    );

    expect(onEndReached).toHaveBeenCalledTimes(1);
  });
  it("should show top loader when there is no loader component and page is 0", () => {
    const data = [
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
    ];

    const onEndReached = jest.fn();
    const testID = faker.random.word();

    const { sut } = makeSut({
      data,
      renderItem: ({ item }) => <Text>{item}</Text>,
      onEndReached,
      testID,
      page: 0,
      loading: true,
    });

    sut.getByText(/buscando.../i);
  });
  it("should show top loader when there is no loader component and page is 0", () => {
    const data = [
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
    ];

    const onEndReached = jest.fn();
    const testID = faker.random.word();

    const { sut } = makeSut({
      data,
      renderItem: ({ item }) => <Text>{item}</Text>,
      onEndReached,
      testID,
      page: 0,
      loading: true,
    });

    sut.getByText(/buscando.../i);
  });
  it("should show total results loader when has loader component", () => {
    const data = [
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
    ];

    const onEndReached = jest.fn();
    const testID = faker.random.word();

    const { sut } = makeSut({
      data,
      renderItem: ({ item }) => <Text>{item}</Text>,
      onEndReached,
      testID,
      page: 0,
      loading: true,

      loaderComponent: <Skeleton width={10} height={10} />,
      totalResults: data.length,
    });

    sut.getByTestId(`${testID}-total-results-loader`);
  });
  it("should show bottom loader when there is no loader component and page is > 0", () => {
    const data = [
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
    ];

    const onEndReached = jest.fn();
    const testID = faker.random.word();

    const { sut } = makeSut({
      data,
      renderItem: ({ item }) => <Text>{item}</Text>,
      onEndReached,
      testID,
      page: 1,
      loading: true,
    });

    sut.getByTestId(`${testID}-bottom-loader`);
  });
  it("should show loader component when page is first load", () => {
    const data = [
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
    ];

    const onEndReached = jest.fn();
    const testID = faker.random.word();

    const { sut } = makeSut({
      data,
      renderItem: ({ item }) => <Text>{item}</Text>,
      onEndReached,
      testID,
      page: 0,
      loading: true,
      loaderComponent: <Skeleton width={10} height={10} />,
      totalResults: data.length,
    });

    sut.getByTestId(`${testID}-bottom-loader-container`);
  });
  it("should show loader component when page is >= 0", () => {
    const data = [
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
    ];

    const onEndReached = jest.fn();
    const testID = faker.random.word();

    const { sut } = makeSut({
      data,
      renderItem: ({ item }) => <Text>{item}</Text>,
      onEndReached,
      testID,
      page: 1,
      loading: true,
      loaderComponent: <Skeleton width={10} height={10} />,
      totalResults: data.length,
    });

    sut.getByTestId(`${testID}-bottom-loader-container`);
  });
  it("should show filters", () => {
    const data = [
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
    ];

    const filterObjectKey = faker.random.word();

    const filters: { [key: string]: Filter } = {
      [filterObjectKey]: {
        label: faker.random.word(),
        value: faker.random.word(),
        apiValue: faker.random.word(),
        filterKey: filterObjectKey,
      },
    };

    const testID = faker.random.word();

    const { sut } = makeSut({
      data,
      renderItem: ({ item }) => <Text>{item}</Text>,
      testID,
      filters,
    });

    sut.getByTestId(`${testID}-filters`);
  });
  it("should ListHeaderComponent if it exists", () => {
    const data = [
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
    ];

    const { sut } = makeSut({
      data,
      renderItem: ({ item }) => <Text>{item}</Text>,
      ListHeaderComponent: <Text>Header Component</Text>,
    });

    sut.getByText(/header component/i);
  });
  it("should call onRefresh", () => {
    const data = [
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
    ];

    const testID = faker.random.word();
    const onRefresh = jest.fn();

    const { sut } = makeSut({
      data,
      renderItem: ({ item }) => <Text>{item}</Text>,
      refreshing: true,
      enableRefresh: true,
      onRefresh,
      testID,
    });

    fireEvent(sut.getByTestId(testID), "refresh");

    expect(onRefresh).toHaveBeenCalledTimes(1);
  });
  it("should format total results message when there is 0 results found", () => {
    const data = [
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
    ];

    const { sut } = makeSut({
      data,
      renderItem: ({ item }) => <Text>{item}</Text>,
      totalResults: 0,
    });

    sut.getByText(/nenhum resultado encontrado/i);
  });
  it("should format total results message when there is 1 result found", () => {
    const data = [
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
    ];

    const { sut } = makeSut({
      data,
      renderItem: ({ item }) => <Text>{item}</Text>,
      totalResults: 1,
    });

    sut.getByText(/1 resultado encontrado/i);
  });
  it("should format total results message when there is more than 1 result found", () => {
    const data = [
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
    ];

    const totalResults = Math.floor(Math.random() * 1000);

    const { sut } = makeSut({
      data,
      renderItem: ({ item }) => <Text>{item}</Text>,
      totalResults,
    });

    sut.getByText(`${totalResults} resultados encontrados`);
  });
});
