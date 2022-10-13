import React from "react";
import { faker } from "@faker-js/faker";
import { RenderResult } from "@testing-library/react-native";

import { renderWithProviders } from "../__mocks__/app.provider";
import {
  Webview,
  WebviewProps,
} from "../../../src/presentation/components/webview/webview";

type SutTypes = {
  sut: RenderResult;
  data: {
    testID: string;
  };
};

const makeSut = (props?: WebviewProps): SutTypes => {
  const testID = faker.random.numeric();

  const sut = renderWithProviders({
    Screen: () => <Webview testID={testID} {...props} />,
  });

  return {
    sut,
    data: {
      testID,
    },
  };
};

describe("WebView", () => {
  it("should have the correct props", async () => {
    const uri = faker.internet.url();

    const { sut, data } = makeSut({ uri });

    const containerProps = sut.getByTestId(data.testID).props;

    expect(containerProps.source.uri).toBe(uri);
  });
});
