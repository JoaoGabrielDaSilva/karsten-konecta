import React from "react";
import { Text } from "react-native";
import { faker } from "@faker-js/faker";
import { RenderResult } from "@testing-library/react-native";

import { renderWithProviders } from "../../__mocks__/app.provider";

import {
  SectionTitle,
  SectionTitleProps,
} from "../../../../src/presentation/components/utils";

type SutTypes = {
  sut: RenderResult;
  data: {
    testID: string;
  };
};

const makeSut = (props?: Partial<SectionTitleProps>): SutTypes => {
  const testID = faker.random.numeric();

  const sut = renderWithProviders({
    Screen: () => <SectionTitle testID={testID} {...props} />,
  });

  return {
    sut,
    data: {
      testID,
    },
  };
};

describe("SectionTitle", () => {
  it("should have correct params", async () => {
    const text = faker.random.word();

    const children = <Text>{text}</Text>;

    const { sut } = makeSut({ children });

    sut.getByText(text);
  });
  it("should have correct params", async () => {
    const { sut, data } = makeSut();

    const containerProps = sut.getByTestId(data.testID).props;

    expect(containerProps).toHaveProperty("bold", true);
    expect(containerProps).toHaveProperty("variant", "heading");
    expect(containerProps).toHaveProperty("testID", data.testID);
  });
});
