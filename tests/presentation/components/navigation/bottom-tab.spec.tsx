import { fireEvent, RenderResult } from "@testing-library/react-native";
import { BottomTab } from "../../../../src/presentation/components/navigation/bottom-tab/bottom-tab";

import { renderWithProviders } from "../../__mocks__/app.provider";

const mockedReset = jest.fn();
const mockedNavigate = jest.fn();

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
      getState: () => ({
        routes: [],
        index: 0,
      }),
      reset: mockedReset,
    }),
  };
});

type SutTypes = {
  sut: RenderResult;
};

const makeSut = (): SutTypes => {
  const sut = renderWithProviders({
    Screen: () => <BottomTab />,
  });

  return {
    sut,
  };
};

describe("BottomTab", () => {
  afterEach(() => mockedNavigate.mockClear());

  it("should call the correct route on press Catalog route", async () => {
    const { sut } = makeSut();

    fireEvent.press(sut.getByText(/catálogo/i));

    // expect(mockedReset).toHaveBeenCalledTimes(1);
    // expect(mockedReset).toHaveBeenCalledWith({
    //   routes: [{ name: "Catalog" }],
    // });
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith("Catalog");
  });
  it("should call the correct route on press Sales route", async () => {
    const { sut } = makeSut();

    fireEvent.press(sut.getByText(/vendas/i));

    // expect(mockedReset).toHaveBeenCalledTimes(1);
    // expect(mockedReset).toHaveBeenCalledWith({
    //   routes: [{ name: "Sales" }],
    // });
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith("Sales");
  });
  it("should call the correct route on press CustomerSearch route", async () => {
    const { sut } = makeSut();

    fireEvent.press(sut.getByText(/consulta 360/i));

    // expect(mockedReset).toHaveBeenCalledTimes(1);
    // expect(mockedReset).toHaveBeenCalledWith({
    //   routes: [{ name: "CustomerSearch" }],
    // });
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith("CustomerSearch");
  });
});
