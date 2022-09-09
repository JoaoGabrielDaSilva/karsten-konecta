import { faker } from "@faker-js/faker";
import { RemoteAuthentication } from "../../../src/data/usecases/authentication/remote-authentication";
import { Authentication } from "../../../src/domain/usecases/authentication/authentication";

const userId = faker.random.alphaNumeric(20);

export const mockAuthenticationParams = (): Authentication.Params => ({
  login: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAuthenticationModel = (): Authentication.Model => ({
  userId,
});

export const mockRemoteAuthenticationModel =
  (): RemoteAuthentication.Model => ({
    Result: {
      IdUser: userId,
    },
  });

export class AuthenticationSpy implements Authentication {
  authData = mockAuthenticationModel();
  params: Authentication.Params;
  callsCount = 0;

  async auth(params: Authentication.Params): Promise<Authentication.Model> {
    this.params = params;
    this.callsCount++;

    return this.authData;
  }
}
