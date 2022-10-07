import { faker } from "@faker-js/faker";
import { fireEvent, RenderResult } from "@testing-library/react-native";
import {
  ProductCardProps,
  ProductCard,
} from "../../../src/presentation/components/cards/product-card/product-card";

import { renderWithProviders } from "../mocks/app.provider";

type SutTypes = {
  sut: RenderResult;
  data: ProductCardProps;
};

const mockProps = (): ProductCardProps => ({
  name: faker.commerce.productName(),
  code: faker.random.numeric(6),
  ean: faker.random.numeric(11),
  uri: faker.internet.url(),
});

const makeSut = (props?: Partial<ProductCardProps>): SutTypes => {
  const mockedProps = mockProps();

  const sut = renderWithProviders({
    Screen: () => (
      <ProductCard testID={mockedProps.code} {...mockedProps} {...props} />
    ),
  });

  return {
    sut,
    data: mockedProps,
  };
};

describe("OrderCard", () => {
  it("should show correct data", async () => {
    const { sut, data } = makeSut();

    sut.getByText(data.name);
    sut.getByText(`Código: ${data.code}`);
    sut.getByText(`EAN: ${data.ean}`);

    expect(sut.getByTestId(`${data.code}-image`).props.source.uri).toBe(
      data.uri
    );
  });

  it("should call onPress with correct data", async () => {
    const onPress = jest.fn();
    const { sut, data } = makeSut({
      onPress,
    });

    fireEvent.press(sut.getByTestId(data.code));

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onPress).toHaveBeenCalledWith({ ...data });
  });
});
