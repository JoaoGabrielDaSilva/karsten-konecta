import { faker } from "@faker-js/faker";
import { fireEvent, RenderResult } from "@testing-library/react-native";
import { ProductModel } from "../../../src/domain/models/product";
import {
  ShippingInfo,
  ShippingInfoProps,
} from "../../../src/presentation/components/shipping-info/shipping-info";

import { renderWithProviders } from "../__mocks__/app.provider";

type SutTypes = {
  sut: RenderResult;
  data: ShippingInfoProps;
};

const mockProps = (): ShippingInfoProps => ({
  days: Math.floor(Math.random() * (15 - 1)) + 1,
});

const makeSut = (props?: Partial<ShippingInfoProps>): SutTypes => {
  const mockedProps = mockProps();

  const sut = renderWithProviders({
    Screen: () => <ShippingInfo {...mockedProps} {...props} />,
  });

  return {
    sut,
    data: mockedProps,
  };
};

describe("ShippingInfo", () => {
  it("should show correct layout when day is equal to 1", async () => {
    const days = 1;

    const { sut } = makeSut({
      days,
    });

    sut.getByText(/padrão/i);
    sut.getByText(`Em até ${days} dia útil - Grátis`);
  });
  it("should show correct layout when day is higher than 1", async () => {
    const { sut, data } = makeSut();

    sut.getByText(/padrão/i);
    sut.getByText(`Em até ${data.days} dias úteis - Grátis`);
  });
});
