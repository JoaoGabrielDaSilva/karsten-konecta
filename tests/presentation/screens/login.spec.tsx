import { faker } from "@faker-js/faker";
import {
  render,
  fireEvent,
  waitFor,
  RenderResult,
} from "@testing-library/react-native";

import { Login } from "../../../src/presentation/screens/login/login";
import { AuthenticationSpy } from "../../domain/mocks/mock-authentication";
import { AppProviders, renderWithProviders } from "../mocks/app.provider";

type SutTypes = {
  sut: RenderResult;
  authentication: AuthenticationSpy;
};

const makeSut = (): SutTypes => {
  const authentication = new AuthenticationSpy();
  const sut = renderWithProviders({
    Screen: () => Login({ authentication }),
  });

  return { sut, authentication };
};

describe("LoginScreen", () => {
  it("should show required error on login and password fields if there is no value inside them", async () => {
    const { sut, authentication } = makeSut();

    await waitFor(() => {
      fireEvent.press(sut.getByTestId("submit-button"));
    });

    sut.getByText("O e-mail deve ser informado");
    sut.getByText("A senha deve ser informada");

    expect(authentication.callsCount).toBe(0);
  });
  it("should show invalid field error on login and password fields form is invalid", async () => {
    const { sut, authentication } = makeSut();

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

    expect(authentication.callsCount).toBe(0);
  });
  it("should submit form and call Authentication", async () => {
    const { sut, authentication } = makeSut();

    const login = faker.internet.email();
    const password = faker.random.alphaNumeric(4);

    await waitFor(async () => {
      fireEvent.changeText(sut.getByTestId("email-field"), login);
      fireEvent.changeText(sut.getByTestId("password-field"), password);
      fireEvent.press(sut.getByTestId("submit-button"));
    });

    expect(authentication.callsCount).toBe(1);
    expect(authentication.params).toEqual({
      login,
      password,
    });
  });
});
