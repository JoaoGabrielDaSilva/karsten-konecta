import { faker } from "@faker-js/faker";
import { fireEvent, RenderResult } from "@testing-library/react-native";
import {
  Alert,
  AlertProps,
  ALERT_ICONS,
} from "../../../src/presentation/components/alert/alert";

import { renderWithProviders } from "../__mocks__/app.provider";

type SutTypes = {
  sut: RenderResult;
  properties: AlertProps & {
    icon: typeof ALERT_ICONS[keyof typeof ALERT_ICONS];
  };
};

const makeSut = (props: Partial<AlertProps> = { type: "error" }): SutTypes => {
  const properties = {
    children: faker.random.words(),
    type: props.type,
    icon: ALERT_ICONS[props.type],
  };

  const sut = renderWithProviders({
    Screen: () => <Alert {...properties} />,
  });

  return {
    sut,
    properties,
  };
};

describe("Alert", () => {
  it("should show error data when type is equal to error", async () => {
    const { sut, properties } = makeSut({ type: "error" });

    sut.UNSAFE_getByProps({
      name: properties.icon,
    });
    sut.getByText(properties.children);
  });
  it("should show success data when type is equal to success", async () => {
    const { sut, properties } = makeSut({ type: "success" });

    sut.UNSAFE_getByProps({
      name: properties.icon,
    });
    sut.getByText(properties.children);
  });
  it("should show info data when type is equal to info", async () => {
    const { sut, properties } = makeSut({ type: "info" });

    sut.UNSAFE_getByProps({
      name: properties.icon,
    });
    sut.getByText(properties.children);
  });
  it("should show warning data when type is equal to warning", async () => {
    const { sut, properties } = makeSut({ type: "warning" });

    sut.UNSAFE_getByProps({
      name: properties.icon,
    });
    sut.getByText(properties.children);
  });
});
