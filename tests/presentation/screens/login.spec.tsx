import { faker } from "@faker-js/faker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  render,
  fireEvent,
  waitFor,
  RenderResult,
  renderHook,
  act,
} from "@testing-library/react-native";
import { InvalidCredentialsError } from "../../../src/domain/errors/invalid-credentials-error";
import { setCurrentAccountIdAdapter } from "../../../src/main/adapters/current-account-id-adapter";
import { makeAsyncStorageAdapter } from "../../../src/main/factories/cache/local-storage-adapter-factory";

import { Login } from "../../../src/presentation/screens/login/login";
import { useUserStore } from "../../../src/presentation/store/user";
import { AuthenticationSpy } from "../../domain/mocks/mock-authentication";
import { GetStoreListSpy } from "../../domain/mocks/store/mock-get-store-list";
import { GetUserDataSpy } from "../../domain/mocks/user/mock-get-user-data";
import { mockUserModel } from "../../domain/mocks/user/mock-user";
import { renderWithProviders } from "../__mocks__/app.provider";
import Toast from "react-native-toast-message";

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
  getUserDataSpy: GetUserDataSpy;
  getStoreListSpy: GetStoreListSpy;
};

const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy();
  const getUserDataSpy = new GetUserDataSpy();
  const getStoreListSpy = new GetStoreListSpy();

  const sut = renderWithProviders({
    Screen: () =>
      Login({
        authentication: authenticationSpy,
        getUserData: getUserDataSpy,
        getStoreList: getStoreListSpy,
      }),
  });

  return { sut, getUserDataSpy, authenticationSpy, getStoreListSpy };
};

describe("LoginScreen", () => {
  it("should show required error on login and password fields if there is no value inside them", async () => {
    const { sut, authenticationSpy } = makeSut();

    await waitFor(() => {
      fireEvent.press(sut.getByTestId("submit-button"));
    });

    sut.getByText("O e-mail deve ser informado");
    sut.getByText("A senha deve ser informada");

    expect(authenticationSpy.callsCount).toBe(0);
  });
  it("should show invalid field error on login and password fields form is invalid", async () => {
    const { sut, authenticationSpy } = makeSut();

    await waitFor(() => {
      fireEvent.changeText(sut.getByTestId("email-field"), "1");
      fireEvent.changeText(
        sut.getByTestId("password-field"),
        faker.random.alphaNumeric(2)
      );

      fireEvent.press(sut.getByTestId("submit-button"));
    });

    sut.getByText("O e-mail deve ser válido");
    sut.getByText("A senha deve conter no mínimo 3 caracteres");

    expect(authenticationSpy.callsCount).toBe(0);
  });
  it("should submit form and call authenticate user", async () => {
    jest.useFakeTimers();
    const { sut, authenticationSpy, getUserDataSpy, getStoreListSpy } =
      makeSut();

    const login = faker.internet.email();
    const password = faker.random.alphaNumeric(4);

    await act(async () => {
      fireEvent.changeText(sut.getByTestId("email-field"), login);
      fireEvent.changeText(sut.getByTestId("password-field"), password);
      const button = sut.getByTestId("submit-button");
      fireEvent.press(button);
    });

    const userData = mockUserModel();

    getUserDataSpy.userData = userData;

    expect(authenticationSpy.callsCount).toBe(1);
    expect(authenticationSpy.params).toEqual({
      login,
      password,
    });
    // expect(setUserData).toHaveBeenCalledWith({
    //   ...userData,
    //   logged: true,
    //   store: getStoreListSpy.storeList[0],
    // });

    expect(getUserDataSpy.callsCount).toBe(1);
    expect(getUserDataSpy.userData).toEqual(userData);

    expect(getStoreListSpy.callsCount).toBe(1);

    expect(getStoreListSpy.params).toEqual({
      page: 0,
    });
  });
  it("should not authenticate user if Authentication returns 401", async () => {
    const { sut, authenticationSpy, getUserDataSpy, getStoreListSpy } =
      makeSut();

    const login = faker.internet.email();
    const password = faker.random.alphaNumeric(4);

    const error = new InvalidCredentialsError();
    jest.spyOn(authenticationSpy, "auth").mockRejectedValue(error);

    await waitFor(async () => {
      fireEvent.changeText(sut.getByTestId("email-field"), login);
      fireEvent.changeText(sut.getByTestId("password-field"), password);
      fireEvent.press(sut.getByTestId("submit-button"));
    });

    expect(authenticationSpy.auth).rejects.toThrow(error);

    expect(getUserDataSpy.callsCount).toBe(0);
    expect(getStoreListSpy.callsCount).toBe(0);
    expect(Toast.show).toBeCalledWith({
      type: "error",
      text1: "Erro!",
      text2: error.message,
      topOffset: 70,
      visibilityTime: 3000,
    });
  });
});
