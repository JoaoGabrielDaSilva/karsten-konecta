import React, { ReactNode } from "react";
import { FlexAlignType, StyleProp, Text, TextStyle } from "react-native";
import { faker } from "@faker-js/faker";
import { RenderResult } from "@testing-library/react-native";

import { renderWithProviders } from "../../__mocks__/app.provider";

import {
  FlexJustifyType,
  Row,
  RowProps,
} from "../../../../src/presentation/components/utils";

type SutTypes = {
  sut: RenderResult;
  data: {
    testID: string;
  };
};

const makeSut = (props?: Partial<RowProps>): SutTypes => {
  const testID = faker.random.numeric();

  const sut = renderWithProviders({
    Screen: () => <Row testID={testID} {...props} />,
  });

  return {
    sut,
    data: {
      testID,
    },
  };
};

describe("Row", () => {
  it("should render children", async () => {
    const text = faker.random.word();

    const children = <Text>{text}</Text>;

    const { sut } = makeSut({ children });

    sut.getByText(text);
  });
  it("should have the correct styles", async () => {
    const { sut, data } = makeSut();

    const containerStyle = sut.getByTestId(data.testID).props.style;

    expect(containerStyle).toEqual({
      alignItems: "flex-start",
      justifyContent: "flex-start",
      flexDirection: "row",
    });
  });
  it("should have the alignItems style equal to baseline", async () => {
    const align: FlexAlignType = "baseline";

    const { sut, data } = makeSut({
      align,
    });

    const containerStyle = sut.getByTestId(data.testID).props.style;

    expect(containerStyle).toEqual({
      alignItems: align,
      justifyContent: "flex-start",
      flexDirection: "row",
    });
  });
  it("should have the alignItems style equal to center", async () => {
    const align: FlexAlignType = "center";

    const { sut, data } = makeSut({
      align,
    });

    const containerStyle = sut.getByTestId(data.testID).props.style;

    expect(containerStyle).toEqual({
      alignItems: align,
      justifyContent: "flex-start",
      flexDirection: "row",
    });
  });
  it("should have the alignItems style equal to flex-end", async () => {
    const align: FlexAlignType = "flex-end";

    const { sut, data } = makeSut({
      align,
    });

    const containerStyle = sut.getByTestId(data.testID).props.style;

    expect(containerStyle).toEqual({
      alignItems: align,
      justifyContent: "flex-start",
      flexDirection: "row",
    });
  });
  it("should have the alignItems style equal to flex-start", async () => {
    const align: FlexAlignType = "flex-start";

    const { sut, data } = makeSut({
      align,
    });

    const containerStyle = sut.getByTestId(data.testID).props.style;

    expect(containerStyle).toEqual({
      alignItems: align,
      justifyContent: "flex-start",
      flexDirection: "row",
    });
  });
  it("should have the alignItems style equal to stretch", async () => {
    const align: FlexAlignType = "stretch";

    const { sut, data } = makeSut({
      align,
    });

    const containerStyle = sut.getByTestId(data.testID).props.style;

    expect(containerStyle).toEqual({
      alignItems: align,
      justifyContent: "flex-start",
      flexDirection: "row",
    });
  });
  it("should have the justifyContent style equal to center", async () => {
    const justify: FlexJustifyType = "center";

    const { sut, data } = makeSut({
      justify,
    });

    const containerStyle = sut.getByTestId(data.testID).props.style;

    expect(containerStyle).toEqual({
      alignItems: "flex-start",
      justifyContent: justify,
      flexDirection: "row",
    });
  });
  it("should have the justifyContent style equal to flex-end", async () => {
    const justify: FlexJustifyType = "flex-end";
    const { sut, data } = makeSut({
      justify,
    });

    const containerStyle = sut.getByTestId(data.testID).props.style;

    expect(containerStyle).toEqual({
      alignItems: "flex-start",
      justifyContent: justify,
      flexDirection: "row",
    });
  });
  it("should have the justifyContent style equal to flex-start", async () => {
    const justify: FlexJustifyType = "flex-start";

    const { sut, data } = makeSut({
      justify,
    });
    const containerStyle = sut.getByTestId(data.testID).props.style;

    expect(containerStyle).toEqual({
      alignItems: "flex-start",
      justifyContent: justify,
      flexDirection: "row",
    });
  });
  it("should have the justifyContent style equal to space-around", async () => {
    const justify: FlexJustifyType = "space-around";

    const { sut, data } = makeSut({
      justify,
    });

    const containerStyle = sut.getByTestId(data.testID).props.style;

    expect(containerStyle).toEqual({
      alignItems: "flex-start",
      justifyContent: justify,
      flexDirection: "row",
    });
  });
  it("should have the justifyContent style equal to space-between", async () => {
    const justify: FlexJustifyType = "space-between";

    const { sut, data } = makeSut({
      justify,
    });

    const containerStyle = sut.getByTestId(data.testID).props.style;

    expect(containerStyle).toEqual({
      alignItems: "flex-start",
      justifyContent: justify,
      flexDirection: "row",
    });
  });
  it("should have the justifyContent style equal to space-evenly", async () => {
    const justify: FlexJustifyType = "space-evenly";

    const { sut, data } = makeSut({
      justify,
    });

    const containerStyle = sut.getByTestId(data.testID).props.style;

    expect(containerStyle).toEqual({
      alignItems: "flex-start",
      justifyContent: justify,
      flexDirection: "row",
    });
  });
  it("should extra styles", async () => {
    const justify: FlexJustifyType = "space-evenly";
    const align: FlexAlignType = "center";

    const color = faker.color.rgb();

    const style: StyleProp<TextStyle> = {
      color,
    };

    const { sut, data } = makeSut({
      justify,
      align,
      style,
    });

    const containerStyle = sut.getByTestId(data.testID).props.style;

    expect(containerStyle).toEqual({
      ...style,
      alignItems: align,
      justifyContent: justify,
      flexDirection: "row",
    });
  });
});
