import { faker } from "@faker-js/faker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  render,
  fireEvent,
  waitFor,
  RenderResult,
  act,
} from "@testing-library/react-native";

import { renderWithProviders } from "../__mocks__/app.provider";
import { NewAttendance } from "../../../src/presentation/screens/new-attendance/new-attendance";
import { mockNavigationProps } from "../__mocks__/navigation-prop";
import { GetCustomerSpy } from "../../domain/mocks/customer/mock-get-customer";
import { useUserStore } from "../../../src/presentation/store/user";
import { useCustomerStore } from "../../../src/presentation/store/customer";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootPrivateStackParamList } from "../../../src/presentation/routes";
import { mockStore } from "../__mocks__/store/mock-user-store";
import { NewNoCustomerAttendance } from "../../../src/presentation/screens/new-no-customer-attendance/new-no-customer-attendance";

type SutTypes = {
  sut: RenderResult;
  navigation: StackNavigationProp<
    RootPrivateStackParamList,
    "NewNoCustomerAttendance"
  >;
};

const makeSut = (): SutTypes => {
  const mockedNavigation = mockNavigationProps<"NewNoCustomerAttendance">(
    "NewNoCustomerAttendance"
  );

  const sut = renderWithProviders({
    Screen: () =>
      NewNoCustomerAttendance({
        ...mockedNavigation,
      }),
  });

  return { sut, navigation: mockedNavigation.navigation };
};

describe("New No Customer Attendance", () => {
  it("should show error if name is empty", async () => {
    const { sut } = makeSut();

    await act(() => fireEvent.press(sut.getByText(/iniciar atendimento/i)));

    sut.getByText("O nome do cliente deve ser informado");
  });
  it("should show error if name has less than 3 characters", async () => {
    const { sut } = makeSut();

    const name = "Jo";

    const input = sut.getByTestId("name-input");

    await act(() => fireEvent.changeText(input, name));
    await act(() => fireEvent.press(sut.getByText(/iniciar atendimento/i)));

    sut.getByText("O nome do cliente deve conter pelo menos 3 caracteres");
  });
  it("should submit if name is valid", async () => {
    const { sut, navigation } = makeSut();

    const name = faker.name.fullName();

    const input = sut.getByTestId("name-input");

    await act(() => fireEvent.changeText(input, name));
    await act(() => fireEvent.press(sut.getByText(/iniciar atendimento/i)));

    expect(navigation.navigate).toHaveBeenCalledTimes(1);
    expect(navigation.navigate).toHaveBeenCalledWith("Attendance", { name });
  });
  it("should have top description about the screen", async () => {
    const { sut } = makeSut();

    sut.getByText(/digite o nome do cliente para iniciar um atendimento/i);
  });
});
