import { faker } from "@faker-js/faker";
import { AuthModel } from "../../../src/domain/models/auth-model";
import { Authentication } from "../../../src/domain/usecases/authentication/authentication";

export const mockAuthenticationParams = (): Authentication.Params => ({
  login: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAuthenticationModel = (): Authentication.Model => ({
  userId: faker.random.alphaNumeric(20),
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
