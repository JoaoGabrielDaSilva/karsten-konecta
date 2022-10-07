import { faker } from "@faker-js/faker";
import { fireEvent, RenderResult } from "@testing-library/react-native";
import { ProductModel } from "../../../src/domain/models/product";
import {
  StoreCardProps,
  StoreCard,
} from "../../../src/presentation/components/cards/store-card/store-card";
import { cnpjMask } from "../../../src/presentation/utils/mask/cnpj-mask";

import { renderWithProviders } from "../mocks/app.provider";

type SutTypes = {
  sut: RenderResult;
  data: StoreCardProps;
};

const mockProps = (): StoreCardProps => ({
  name: faker.company.name(),
  corporateName: faker.company.name(),
  cnpj: cnpjMask(faker.random.numeric(14)),
});

const makeSut = (props?: Partial<StoreCardProps>): SutTypes => {
  const mockedProps = mockProps();

  const sut = renderWithProviders({
    Screen: () => <StoreCard {...mockedProps} {...props} />,
  });

  return {
    sut,
    data: mockedProps,
  };
};

describe("StoreCard", () => {
  it("should show correct data", async () => {
    const { sut, data } = makeSut();

    sut.getByText(data.name);
    sut.getByText(data.corporateName);
    sut.getByText(data.cnpj);

    sut.UNSAFE_getByProps({
      active: false,
    });
  });
  it("should select radio button selected when selected prop is true", async () => {
    const { sut } = makeSut({ selected: true });

    sut.UNSAFE_getByProps({
      active: true,
    });
  });
});
