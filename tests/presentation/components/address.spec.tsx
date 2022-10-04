import { faker } from "@faker-js/faker";
import { fireEvent, render, RenderResult } from "@testing-library/react-native";
import { CustomerAddressModel } from "../../../src/domain/models/address";
import {
  Address,
  AddressProps,
} from "../../../src/presentation/components/address/address";
import { renderWithProviders } from "../mocks/app.provider";

type SutTypes = {
  sut: RenderResult;
  mockedAddress: CustomerAddressModel;
};

const mockCustomerAddress = (): CustomerAddressModel => ({
  id: faker.random.numeric(4),
  complement: faker.random.word(),
  reference: faker.random.word(),
  street: faker.address.street(),
  number: faker.address.buildingNumber(),
  cep: faker.address.zipCode("#####-##"),
  city: faker.address.city(),
  district: faker.address.county(),
  name: faker.random.word(),
  state: faker.address.state(),
});

const makeSut = (props?: Partial<AddressProps>): SutTypes => {
  const mockedAddress = mockCustomerAddress();

  const sut = renderWithProviders({
    Screen: () => (
      <Address testID={mockedAddress.id} {...mockedAddress} {...props} />
    ),
  });

  return {
    sut,
    mockedAddress,
  };
};

describe("Address", () => {
  it("should show the correct address data on screen", async () => {
    const { sut, mockedAddress } = makeSut();

    sut.getByText(mockedAddress.name);
    sut.getByText(`${mockedAddress.street}, ${mockedAddress.number}`);
    sut.getByText(mockedAddress.complement);
    sut.getByText(
      `${mockedAddress.district} - ${mockedAddress.city}/${mockedAddress.state}`
    );
    sut.getByText(mockedAddress.cep);

    sut.getByText(mockedAddress.reference);
  });
  it("should not show reference and complement when it is null", async () => {
    const { sut, mockedAddress } = makeSut({
      complement: null,
      reference: null,
    });

    expect(sut.queryByText(mockedAddress.complement)).toBeNull();
    expect(sut.queryByText(mockedAddress.reference)).toBeNull();
  });
  it("should not show right arrow when showRightArrow is false", async () => {
    const { sut, mockedAddress } = makeSut({
      showRightArrow: false,
    });

    expect(sut.queryByTestId(`${mockedAddress.id}-chevron-right`)).toBeNull();
  });
  it("should show right arrow when showRightArrow is true", async () => {
    const { sut, mockedAddress } = makeSut({
      showRightArrow: true,
    });

    expect(sut.getByTestId(`${mockedAddress.id}-chevron-right`));
  });
  it("should not show editable label when editable is false", async () => {
    const { sut } = makeSut({
      editable: false,
    });

    expect(sut.queryByText(/Alterar/i)).toBeNull();
  });
  it("should show editable label when editable is true", async () => {
    const { sut, mockedAddress } = makeSut({
      editable: true,
    });

    expect(sut.getByText(/Alterar/i));
  });
  it("should not show radio button when selectable is false", async () => {
    const { sut, mockedAddress } = makeSut({
      selectable: false,
    });

    expect(sut.queryByTestId(`${mockedAddress.id}-radio-button`)).toBeNull();
  });
  it("should show radio button when selectable is true", async () => {
    const { sut, mockedAddress } = makeSut({
      selectable: true,
    });

    expect(sut.getByTestId(`${mockedAddress.id}-radio-button`));
  });
});
