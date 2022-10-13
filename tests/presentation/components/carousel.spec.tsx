import { faker } from "@faker-js/faker";
import {
  fireEvent,
  renderHook,
  RenderResult,
} from "@testing-library/react-native";
import React from "react";
import { Dimensions } from "react-native";
import * as Animated from "react-native-reanimated";

import {
  CarouselProps,
  Carousel,
} from "../../../src/presentation/components/carousel/carousel";

import { renderWithProviders } from "../__mocks__/app.provider";

type SutTypes = {
  sut: RenderResult;
  data: CarouselProps;
};

const { width } = Dimensions.get("window");

const mockProps = (): CarouselProps => ({
  images: [faker.internet.url(), faker.internet.url(), faker.internet.url()],
  testID: "carousel",
});

const makeSut = (props?: Partial<CarouselProps>): SutTypes => {
  const mockedProps = mockProps();

  const sut = renderWithProviders({
    Screen: () => <Carousel {...mockedProps} {...props} />,
  });

  return {
    sut,
    data: mockedProps,
  };
};

describe("Carousel", () => {
  it("should show correct data", async () => {
    const { sut, data } = makeSut();

    sut.getByTestId(data.testID);
    data.images.forEach((_, index) =>
      sut.getByTestId(`${data.testID}-image-${index}`)
    );
  });
});
