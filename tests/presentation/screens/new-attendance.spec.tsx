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
import { UnexpectedError } from "../../../src/domain/errors/unexpected-error";

type SutTypes = {
  sut: RenderResult;
  getCustomerSpy: GetCustomerSpy;
  navigation: StackNavigationProp<RootPrivateStackParamList, "NewAttendance">;
};

const makeSut = (): SutTypes => {
  const mockedNavigation =
    mockNavigationProps<"NewAttendance">("NewAttendance");

  const getCustomerSpy = new GetCustomerSpy();

  const sut = renderWithProviders({
    Screen: () =>
      NewAttendance({
        ...mockedNavigation,
        getCustomer: getCustomerSpy,
      }),
  });

  return { sut, getCustomerSpy, navigation: mockedNavigation.navigation };
};

describe("New Attendance", () => {
  it("should navigate to Attendance when customer was found with cpf", async () => {
    const { sut, getCustomerSpy, navigation } = makeSut();

    const cpf = "025.261.080-63";
    const setCustomer = jest.fn();
    const mockedStore = mockStore();
    await waitFor(() => {
      useUserStore.setState({ store: mockedStore });
      useCustomerStore.setState({ setCustomer });
    });

    const input = sut.getByTestId("cpfCnpj");

    await act(() => fireEvent.changeText(input, cpf));

    expect(getCustomerSpy.callsCount).toBe(1);

    expect(getCustomerSpy.params).toEqual({
      cpfCnpj: cpf,
      storeId: mockedStore.id,
    });

    expect(setCustomer).toHaveBeenCalledTimes(1);
    expect(setCustomer).toHaveBeenCalledWith(getCustomerSpy.data);
    expect(navigation.navigate).toHaveBeenCalledTimes(1);
    expect(navigation.navigate).toHaveBeenCalledWith("Attendance", {
      cpfCnpj: cpf,
    });
  });
  it("should navigate to Attendance when customer was found with cnpj", async () => {
    const { sut, getCustomerSpy, navigation } = makeSut();

    const cnpj = "52.821.466/0001-51";
    const setCustomer = jest.fn();
    const mockedStore = mockStore();
    await waitFor(() => {
      useUserStore.setState({ store: mockedStore });
      useCustomerStore.setState({ setCustomer });
    });

    const input = sut.getByTestId("cpfCnpj");

    fireEvent.press(
      sut.UNSAFE_getByProps({
        label: "Pessoa Jurídica",
      })
    );

    await act(() => fireEvent.changeText(input, cnpj));

    expect(getCustomerSpy.callsCount).toBe(1);

    expect(getCustomerSpy.params).toEqual({
      cpfCnpj: cnpj,
      storeId: mockedStore.id,
    });

    expect(setCustomer).toHaveBeenCalledTimes(1);
    expect(setCustomer).toHaveBeenCalledWith(getCustomerSpy.data);
    expect(navigation.navigate).toHaveBeenCalledTimes(1);
    expect(navigation.navigate).toHaveBeenCalledWith("Attendance", {
      cpfCnpj: cnpj,
    });
  });
  it("should not submit if cpf is invalid", async () => {
    const { sut, getCustomerSpy } = makeSut();

    const cpf = "123.456.789-10";
    const setCustomer = jest.fn();
    const mockedStore = mockStore();
    await waitFor(() => {
      useUserStore.setState({ store: mockedStore });
      useCustomerStore.setState({ setCustomer });
    });

    const input = sut.getByTestId("cpfCnpj");

    await act(() => fireEvent.changeText(input, cpf));

    expect(getCustomerSpy.callsCount).toBe(0);
    sut.getByText("Digite um CPF válido!");
  });
  it("should not submit if cnpj is invalid", async () => {
    const { sut, getCustomerSpy } = makeSut();

    const cnpj = "12.345.678/9101-10";
    const setCustomer = jest.fn();
    const mockedStore = mockStore();
    await waitFor(() => {
      useUserStore.setState({ store: mockedStore });
      useCustomerStore.setState({ setCustomer });
    });

    fireEvent.press(
      sut.UNSAFE_getByProps({
        label: "Pessoa Jurídica",
      })
    );

    sut.getByText("CNPJ");

    const input = sut.getByTestId("cpfCnpj");

    await act(() => fireEvent.changeText(input, cnpj));

    expect(getCustomerSpy.callsCount).toBe(0);
    sut.getByText("Digite um CNPJ válido!");
  });
  it("should navigate to NewNoCustomerAttendance screen when customer wasn't found", async () => {
    const { sut, getCustomerSpy, navigation } = makeSut();

    const cpf = "025.261.080-63";
    const setCustomer = jest.fn();
    const mockedStore = mockStore();
    await waitFor(() => {
      useUserStore.setState({ store: mockedStore });
      useCustomerStore.setState({ setCustomer });
    });

    const input = sut.getByTestId("cpfCnpj");

    const error = new UnexpectedError();
    jest.spyOn(getCustomerSpy, "get").mockRejectedValue(error);

    await act(() => fireEvent.changeText(input, cpf));

    expect(getCustomerSpy.get).rejects.toThrow(error);

    expect(navigation.navigate).toHaveBeenCalledWith("NewNoCustomerAttendance");
  });
  it("should navigate to NewNoCustomerAttendance", async () => {
    const { sut, navigation } = makeSut();

    const setCustomer = jest.fn();
    const mockedStore = mockStore();
    await waitFor(() => {
      useUserStore.setState({ store: mockedStore });
      useCustomerStore.setState({ setCustomer });
    });

    fireEvent.press(sut.getByText(/atendimento sem cliente/i));

    expect(navigation.navigate).toHaveBeenCalledWith("NewNoCustomerAttendance");
  });
});
