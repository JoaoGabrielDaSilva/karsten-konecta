import { faker } from "@faker-js/faker";
import { RenderResult } from "@testing-library/react-native";
import React from "react";
import { Dimensions } from "react-native";

import {
  ErrorMessage,
  ErrorMessageProps,
} from "../../../src/presentation/components/error/error-message/error-message";

import { renderWithProviders } from "../mocks/app.provider";

type SutTypes = {
  sut: RenderResult;
};

const makeSut = (props: ErrorMessageProps): SutTypes => {
  const sut = renderWithProviders({
    Screen: () => <ErrorMessage {...props} />,
  });

  return {
    sut,
  };
};

describe("ErrorMessage", () => {
  it("should show correct text", async () => {
    const errorText = faker.random.words();

    const { sut } = makeSut({
      children: errorText,
    });

    sut.getByText(errorText);
  });
});
