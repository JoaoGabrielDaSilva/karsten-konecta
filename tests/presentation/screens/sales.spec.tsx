import {
  fireEvent,
  RenderResult,
  waitFor,
} from "@testing-library/react-native";

import { renderWithProviders } from "../__mocks__/app.provider";
import { Sales } from "../../../src/presentation/screens/sales/sales";
import { mockNavigationProps } from "../__mocks__/navigation-prop";

type SutTypes = {
  sut: RenderResult;
};

let mockedNavigation = mockNavigationProps();

const makeSut = (): SutTypes => {
  const sut = renderWithProviders({
    Screen: () => Sales(mockedNavigation),
  });

  return { sut };
};

describe("SalesScreen", () => {
  beforeEach(() => (mockedNavigation = mockNavigationProps("Sales")));

  it("Should navigate to NewAttendance screen when clicked", async () => {
    const { sut } = makeSut();

    const menu = sut.getByText(/Novo atendimento/i);

    await waitFor(async () => {
      fireEvent.press(menu);
    });
    expect(mockedNavigation.navigation.navigate).toHaveBeenCalledWith(
      "NewAttendance"
    );
    expect(mockedNavigation.navigation.navigate).toBeCalledTimes(1);
  });
  it("Should navigate to AttendanceList screen when clicked", async () => {
    const { sut } = makeSut();

    const menu = sut.getByText(/Atendimentos em Aberto/i);

    fireEvent.press(menu);
    expect(mockedNavigation.navigation.navigate).toHaveBeenCalledWith(
      "AttendanceList"
    );
    expect(mockedNavigation.navigation.navigate).toBeCalledTimes(1);
  });
  it("Should navigate to OrderList screen when clicked", async () => {
    const { sut } = makeSut();

    const menu = sut.getByText(/Pedidos/i);

    fireEvent.press(menu);
    expect(mockedNavigation.navigation.navigate).toHaveBeenCalledWith(
      "OrderList"
    );
    expect(mockedNavigation.navigation.navigate).toBeCalledTimes(1);
  });
});
