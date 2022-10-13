import React from "react";
import { Text } from "react-native";
import { faker } from "@faker-js/faker";
import { RenderResult } from "@testing-library/react-native";

import { renderWithProviders } from "../../__mocks__/app.provider";

import {
  Typography,
  TypographyProps,
  TypographyVariant,
  TextAlign,
  typographyTextAlignDictionary,
} from "../../../../src/presentation/components/utils";

type SutTypes = {
  sut: RenderResult;
  data: {
    testID: string;
  };
};

const makeSut = (props?: Partial<TypographyProps>): SutTypes => {
  const testID = faker.random.numeric();

  const sut = renderWithProviders({
    Screen: () => <Typography testID={testID} {...props} />,
  });

  return {
    sut,
    data: {
      testID,
    },
  };
};

describe("Typography", () => {
  it("should render chidren", async () => {
    const text = faker.random.word();

    const { sut } = makeSut({ children: text });

    sut.getByText(text);
  });
  it("should have correct default props", async () => {
    const { sut, data } = makeSut();

    const variant: TypographyVariant = "text";

    const containerProps = sut.getByTestId(data.testID).props;

    expect(containerProps).toHaveProperty("variant", variant);
    expect(containerProps).toHaveProperty(
      "textAlign",
      typographyTextAlignDictionary[variant]
    );
    expect(containerProps).toHaveProperty("testID", data.testID);
  });
  it("should have correct props", async () => {
    const variant: TypographyVariant = "subtitle";
    const textAlign: TextAlign = "center";
    const { sut, data } = makeSut({
      variant,
      textAlign,
      bold: true,
    });

    const containerProps = sut.getByTestId(data.testID).props;

    expect(containerProps).toHaveProperty("variant", variant);
    expect(containerProps).toHaveProperty("textAlign", textAlign);
    expect(containerProps).toHaveProperty("bold", true);
    expect(containerProps).toHaveProperty("testID", data.testID);
  });
});
