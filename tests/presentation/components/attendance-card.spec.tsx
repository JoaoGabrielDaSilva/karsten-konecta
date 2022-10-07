import { faker } from "@faker-js/faker";
import { fireEvent, RenderResult } from "@testing-library/react-native";
import { ProductModel } from "../../../src/domain/models/product";
import {
  AttendanceCardProps,
  AttendanceCard,
} from "../../../src/presentation/components/cards/attendance-card/attendance-card";
import { cpfMask } from "../../../src/presentation/utils/mask/cpf-mask";

import { renderWithProviders } from "../mocks/app.provider";

type SutTypes = {
  sut: RenderResult;
  data: AttendanceCardProps;
};

const mockProduct = (): ProductModel => ({
  name: faker.commerce.productName(),
  code: faker.random.numeric(8),
  ean: faker.random.numeric(11),
  uri: faker.internet.url(),
  amount: Math.random() * 10,
});

const mockProps = (): AttendanceCardProps => ({
  cpfCnpj: faker.random.numeric(11),
  createdAt: faker.date.past().toISOString(),
  id: faker.random.numeric(),
  name: faker.name.firstName(),
  totalProductsInCart: Math.random() * 10,
  lastAddedProduct: mockProduct(),
});

const makeSut = (props?: Partial<AttendanceCardProps>): SutTypes => {
  const mockedProps = mockProps();

  const sut = renderWithProviders({
    Screen: () => (
      <AttendanceCard testID={mockedProps.id} {...mockedProps} {...props} />
    ),
  });

  return {
    sut,
    data: mockedProps,
  };
};

describe("AttendanceCard", () => {
  it("should show correct data", async () => {
    const { sut, data } = makeSut();

    sut.getByText(data.name);
    sut.getByText(cpfMask(data.cpfCnpj));
    sut.getByText(data.createdAt);
    sut.getByText(String(data.totalProductsInCart));
    sut.getByText(String(data.lastAddedProduct.name));
    sut.getByText(String(data.lastAddedProduct.code));
    sut.getByText(String(data.lastAddedProduct.ean));
    sut.getByText(String(data.lastAddedProduct.amount));
  });
  it("should not show cpf/cnpj if it doesn't exist", async () => {
    const { sut, data } = makeSut({
      cpfCnpj: null,
    });

    expect(sut.queryByText(cpfMask(data.cpfCnpj))).toBeFalsy();
  });
  it("should not show last added product if there is no product on attendance", async () => {
    const { sut, data } = makeSut({
      lastAddedProduct: null,
    });

    expect(sut.queryByText(String(data.lastAddedProduct.name))).toBeFalsy();
    expect(sut.queryByText(String(data.lastAddedProduct.code))).toBeFalsy();
    expect(sut.queryByText(String(data.lastAddedProduct.ean))).toBeFalsy();
    expect(sut.queryByText(String(data.lastAddedProduct.amount))).toBeFalsy();
  });
  it("should call onButtonPress when button is clicked", async () => {
    const onPress = jest.fn();
    const { sut } = makeSut({
      onButtonPress: onPress,
    });

    fireEvent.press(sut.getByText(/continuar atendimento/i));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
